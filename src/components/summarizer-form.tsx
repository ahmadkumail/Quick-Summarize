'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { summarizeTextFromInput } from '@/ai/flows/summarize-text-from-input';
import { summarizeTextFromFileUpload } from '@/ai/flows/summarize-text-from-file-upload';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Clipboard, ClipboardCheck, FileText, Loader2, Pencil } from 'lucide-react';

const textSchema = z.object({
  text: z
    .string()
    .min(50, { message: 'Please enter at least 50 characters to summarize.' })
    .max(15000, { message: 'Text cannot exceed 15,000 characters.' }),
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
    .refine((file) => file?.size > 0, 'A file is required.')
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      'Only .txt, .pdf, and .docx files are accepted.'
    ),
});

export function SummarizerForm() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const textForm = useForm<z.infer<typeof textSchema>>({
    resolver: zodResolver(textSchema),
    defaultValues: { text: '' },
  });

  const fileForm = useForm<z.infer<typeof fileSchema>>();

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
      const result = await summarizeTextFromFileUpload({ fileDataUri });
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

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard!",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-primary/10 rounded-full h-12 p-1">
          <TabsTrigger value="text" className="rounded-full flex gap-2 items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Pencil className="w-4 h-4" />
            Paste Text
          </TabsTrigger>
          <TabsTrigger value="file" className="rounded-full flex gap-2 items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FileText className="w-4 h-4" />
            Upload File
          </TabsTrigger>
        </TabsList>
        <TabsContent value="text" className="mt-6">
          <Card className="rounded-xl shadow-lg border-primary/20">
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
                        <FormLabel className="font-semibold text-foreground">Text to summarize</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a long piece of text to summarize..."
                            className="min-h-[200px] resize-y rounded-lg bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          You can enter up to 15,000 characters.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-full h-12 text-lg font-bold"
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    )}
                    Summarize Text
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="file" className="mt-6">
          <Card className="rounded-xl shadow-lg border-primary/20">
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
                        <FormLabel className="font-semibold text-foreground">Upload a file</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            accept=".txt,.pdf,.docx"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </FormControl>
                         <FormDescription>
                          Supported files: .txt, .pdf, .docx (Max 5MB)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-full h-12 text-lg font-bold"
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    )}
                    Summarize File
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isLoading && (
        <Card className="rounded-xl shadow-lg border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center h-48">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="font-semibold text-xl">Generating summary...</p>
              <p className="text-muted-foreground">
                Please wait, this may take a moment.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {summary && !isLoading && (
        <Card className="rounded-xl shadow-lg border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary/10 rounded-t-xl">
            <CardTitle className="text-lg font-semibold text-primary">Your Summary</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleCopy} className="text-primary hover:bg-primary/20 hover:text-primary rounded-full">
              {isCopied ? (
                <ClipboardCheck className="h-5 w-5" />
              ) : (
                <Clipboard className="h-5 w-5" />
              )}
              <span className="sr-only">Copy summary</span>
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-base leading-relaxed text-foreground/90">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
