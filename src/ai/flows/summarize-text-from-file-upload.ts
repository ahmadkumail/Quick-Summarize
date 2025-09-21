'use server';

/**
 * @fileOverview Summarizes text from an uploaded file using AI.
 *
 * - summarizeTextFromFileUpload - A function that takes a file and returns a summary.
 * - SummarizeTextFromFileUploadInput - The input type for the summarizeTextFromFileUpload function.
 * - SummarizeTextFromFileUploadOutput - The return type for the summarizeTextFromFileUpload function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTextFromFileUploadInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "The content of the file as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  summaryLength: z.string().describe('The desired length of the summary (short, medium, or detailed).'),
});
export type SummarizeTextFromFileUploadInput = z.infer<typeof SummarizeTextFromFileUploadInputSchema>;

const SummarizeTextFromFileUploadOutputSchema = z.object({
  summary: z.string().describe('The summarized text from the file.'),
});
export type SummarizeTextFromFileUploadOutput = z.infer<typeof SummarizeTextFromFileUploadOutputSchema>;

export async function summarizeTextFromFileUpload(input: SummarizeTextFromFileUploadInput): Promise<SummarizeTextFromFileUploadOutput> {
  return summarizeTextFromFileUploadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTextFromFileUploadPrompt',
  input: {schema: SummarizeTextFromFileUploadInputSchema},
  output: {schema: SummarizeTextFromFileUploadOutputSchema},
  prompt: `You are an expert summarizer, skilled at condensing large documents into key points. Summarize the following text from the uploaded file.

Make the summary {{summaryLength}}.
- If the user asks for a "short" summary, provide a very brief, one-paragraph summary.
- If the user asks for a "medium" summary, provide a moderately detailed summary with a few key bullet points.
- If the user asks for a "detailed" summary, provide a comprehensive summary with multiple paragraphs and detailed bullet points.

File Content: {{media url=fileDataUri}}`,
});

const summarizeTextFromFileUploadFlow = ai.defineFlow(
  {
    name: 'summarizeTextFromFileUploadFlow',
    inputSchema: SummarizeTextFromFileUploadInputSchema,
    outputSchema: SummarizeTextFromFileUploadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
