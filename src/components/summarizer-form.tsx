'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { summarizeTextFromInput } from '@/ai/flows/summarize-text-from-input';
import { summarizeTextFromFileUpload } from '@/ai/flows/summarize-text-from-file-upload';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { FileText, Loader2, Pencil, Zap } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from './ui/label';

const summaryLengthSchema = z.enum(['short', 'medium', 'detailed']);

const textSchema = z.object({
  text: z
    .string()
    .min(50, { message: 'Please enter at least 50 characters to summarize.' })
    .max(15000, { message: 'Text cannot exceed 15,000 characters.' }),
  summaryLength: summaryLengthSchema,
});

const ACCEPTED_FILE_TYPES = [
  'text/plain',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const fileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => !!file && file?.size > 0, 'A file is required.')
    .refine(
      (file) => !!file && file.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (file) => !!file && ACCEPTED_FILE_TYPES.includes(file.type),
      'Only .txt, .pdf, and .docx files are accepted.'
    ),
  summaryLength: summaryLengthSchema,
});

type SummarizerFormProps = {
  setSummary: (summary: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
};

export function SummarizerForm({
  setSummary,
  setIsLoading,
  isLoading,
}: SummarizerFormProps) {
  const { toast } = useToast();
  const [textWordCount, setTextWordCount] = useState(0);

  const textForm = useForm<z.infer<typeof textSchema>>({
    resolver: zodResolver(textSchema),
    defaultValues: { text: '', summaryLength: 'medium' },
  });

  const fileForm = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
    defaultValues: { summaryLength: 'medium' },
  });

  const handleTextSubmit = async (values: z.infer<typeof textSchema>) => {
    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeTextFromInput(values);
      setSummary(result.summary);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to summarize the text. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSubmit = async (values: z.infer<typeof fileSchema>) => {
    setIsLoading(true);
    setSummary('');

    const fileToDataUri = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target?.result as string);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });

    try {
      const fileDataUri = await fileToDataUri(values.file);
      const { summaryLength } = values;
      const result = await summarizeTextFromFileUpload({
        fileDataUri,
        summaryLength,
      });
      setSummary(result.summary);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description:
          'Failed to summarize the file. Please check the file format and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const SummaryLengthOptions = ({field}: any) => (
    <FormItem className="space-y-3">
      <FormLabel className="font-semibold text-foreground text-left text-base">
        Summary Length
      </FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0"
        >
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <RadioGroupItem value="short" id="short" />
            </FormControl>
            <Label htmlFor="short" className="font-normal text-base">Short</Label>
          </FormItem>
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <RadioGroupItem value="medium" id="medium" />
            </FormControl>
            <Label htmlFor="medium" className="font-normal text-base">Medium</Label>
          </FormItem>
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <RadioGroupItem value="detailed" id="detailed" />
            </FormControl>
            <Label htmlFor="detailed" className="font-normal text-base">Detailed</Label>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );

  return (
    <Tabs defaultValue="text" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-secondary rounded-lg h-12 p-1">
        <TabsTrigger
          value="text"
          className="rounded-md flex gap-2 items-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg"
        >
          <Pencil className="w-4 h-4" />
          Paste Text
        </TabsTrigger>
        <TabsTrigger
          value="file"
          className="rounded-md flex gap-2 items-center data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg"
        >
          <FileText className="w-4 h-4" />
          Upload File
        </TabsTrigger>
      </TabsList>
      <TabsContent value="text" className="mt-4">
        <Card className="rounded-xl shadow-lg border-border/50">
          <CardContent className="p-6">
            <Form {...textForm}>
              <form
                onSubmit={textForm.handleSubmit(handleTextSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={textForm.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-foreground text-left text-base">
                        Paste your text below
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a long piece of text to summarize..."
                          className="min-h-[250px] resize-y rounded-lg bg-background text-base"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const words = e.target.value
                              .trim()
                              .split(/\s+/)
                              .filter(Boolean);
                            setTextWordCount(
                              words.length > 1 || words[0] !== ''
                                ? words.length
                                : 0
                            );
                          }}
                        />
                      </FormControl>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>
                          {textWordCount}{' '}
                          {textWordCount === 1 ? 'word' : 'words'}
                        </span>
                        <span>{field.value.length} / 15,000 characters</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={textForm.control}
                  name="summaryLength"
                  render={({ field }) => <SummaryLengthOptions field={field}/>}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg h-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Zap className="h-5 w-5" />
                  )}
                  Summarize Text
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="file" className="mt-4">
        <Card className="rounded-xl shadow-lg border-border/50">
          <CardContent className="p-6">
            <Form {...fileForm}>
              <form
                onSubmit={fileForm.handleSubmit(handleFileSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={fileForm.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-foreground text-left text-base">
                        Upload your document
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="rounded-lg h-12 text-base file:mr-4 file:py-3 file:px-5 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                          accept=".txt,.pdf,.docx"
                          onChange={(e) =>
                            field.onChange(e.target.files?.[0])
                          }
                        />
                      </FormControl>
                      <FormDescription className="text-left">
                        Supported files: .txt, .pdf, .docx (Max 5MB)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={fileForm.control}
                  name="summaryLength"
                  render={({ field }) => <SummaryLengthOptions field={field}/>}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg h-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Zap className="h-5 w-5" />
                  )}
                  Summarize File
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
