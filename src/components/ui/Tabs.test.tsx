import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

test('renders tabs and triggers', () => {
  render(
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  );
  
  expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument();
  expect(screen.getByText('Content 1')).toBeInTheDocument();
});
