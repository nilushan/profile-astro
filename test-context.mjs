/**
 * Test script to verify chatbot context aggregation
 * Run with: node test-context.mjs
 */

import { aggregatePortfolioContext, generateSystemPrompt } from './src/lib/chatbot-context.ts';

console.log('🔍 Testing Portfolio Context Aggregation...\n');

try {
  const contextData = await aggregatePortfolioContext();

  console.log('✅ Context aggregation successful!\n');
  console.log('📊 Metadata:');
  console.log(`   - Total characters: ${contextData.metadata.totalCharacters.toLocaleString()}`);
  console.log(`   - Estimated tokens: ~${Math.ceil(contextData.metadata.totalCharacters / 4).toLocaleString()}`);
  console.log(`   - Last updated: ${contextData.metadata.lastUpdated}`);
  console.log(`\n📚 Content sources (${contextData.metadata.contentSources.length}):`);
  contextData.metadata.contentSources.forEach(source => {
    console.log(`   - ${source}`);
  });

  const systemPrompt = generateSystemPrompt(contextData.text);
  console.log(`\n📝 System prompt length: ${systemPrompt.length.toLocaleString()} characters`);

  // Show first 500 chars of context
  console.log('\n📄 Context preview (first 500 chars):');
  console.log('---');
  console.log(contextData.text.slice(0, 500));
  console.log('...');
  console.log('---');

  console.log('\n✨ Context is ready for chatbot use!');
  console.log('\n💡 Next steps:');
  console.log('   1. Add GEMINI_API_KEY to .env file');
  console.log('   2. Run: pnpm dev');
  console.log('   3. Look for chat button in bottom-right corner');

} catch (error) {
  console.error('❌ Error testing context:', error);
  process.exit(1);
}
