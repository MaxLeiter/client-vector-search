import { EmbeddingIndex, BinaryEmbeddingIndex } from '../src/index';

interface Query {
  vector: number[];
}

interface ExpectedResult {
  id: string;
}

describe('Embedding Performance Tests', () => {
  let regularIndex: EmbeddingIndex;
  let binaryIndex: BinaryEmbeddingIndex;
  let embeddings: number[][];
  let binaryEmbeddings: Uint8Array[];

  beforeAll(async () => {
    // Initialize the indices and embeddings for testing
    regularIndex = new EmbeddingIndex();
    binaryIndex = new BinaryEmbeddingIndex();
    embeddings = []; // This should be replaced with actual embeddings for testing
    binaryEmbeddings = []; // This should be replaced with actual binary embeddings for testing
  });

  test('Memory Usage - Regular Embeddings', () => {
    const initialMemoryUsage = process.memoryUsage().heapUsed;
    // Populate regularIndex with embeddings
    embeddings.forEach(embedding => {
      regularIndex.add({ id: Math.random().toString(), vector: embedding });
    });
    const finalMemoryUsage = process.memoryUsage().heapUsed;
    const usedMemory = finalMemoryUsage - initialMemoryUsage;
    console.log(`Memory used by Regular Embeddings: ${usedMemory} bytes`);
  });

  test('Memory Usage - Binary Embeddings', () => {
    const initialMemoryUsage = process.memoryUsage().heapUsed;
    // Populate binaryIndex with binary embeddings
    binaryEmbeddings.forEach(embedding => {
      binaryIndex.add({ id: Math.random().toString(), vector: embedding });
    });
    const finalMemoryUsage = process.memoryUsage().heapUsed;
    const usedMemory = finalMemoryUsage - initialMemoryUsage;
    console.log(`Memory used by Binary Embeddings: ${usedMemory} bytes`);
  });

  test('Speed - Regular Embeddings', async () => {
    const startTime = process.hrtime.bigint();
    // Add embedding to regularIndex
    for (const embedding of embeddings) {
      await regularIndex.add({ id: Math.random().toString(), vector: embedding });
    }
    const endTime = process.hrtime.bigint();
    const duration = endTime - startTime;
    expect(Number(duration)).toBeLessThan(100000000); // Example threshold in nanoseconds
  });

  test('Speed - Binary Embeddings', async () => {
    const startTime = process.hrtime.bigint();
    // Add binary embedding to binaryIndex
    for (const embedding of binaryEmbeddings) {
      await binaryIndex.add({ id: Math.random().toString(), vector: embedding });
    }
    const endTime = process.hrtime.bigint();
    const duration = endTime - startTime;
    expect(Number(duration)).toBeLessThan(100000000); // Example threshold in nanoseconds
  });

  test('Accuracy - Regular Embeddings', async () => {
    // Implement accuracy test for regular embeddings
    // This will require a method to calculate and compare the accuracy of the search results
    // For the purpose of this example, we will assume a mock function that calculates accuracy
    const accuracy = await mockCalculateAccuracy(regularIndex, queries, expectedResults);
    expect(accuracy).toBeGreaterThan(0.8); // Example threshold for accuracy
  });

  test('Accuracy - Binary Embeddings', async () => {
    // Implement accuracy test for binary embeddings
    // This will require a method to calculate and compare the accuracy of the search results
    // For the purpose of this example, we will assume a mock function that calculates accuracy
    const accuracy = await mockCalculateAccuracy(binaryIndex, queries, expectedResults);
    expect(accuracy).toBeGreaterThan(0.8); // Example threshold for accuracy
  });
});

// Mock function for calculating accuracy
async function mockCalculateAccuracy(index: EmbeddingIndex | BinaryEmbeddingIndex, queries: Query[], expectedResults: ExpectedResult[]): Promise<number> {
  let correct = 0;
  for (let i = 0; i < queries.length; i++) {
    const searchResults = await index.search(queries[i].vector);
    if (searchResults && searchResults.length > 0 && searchResults[0].object && typeof searchResults[0].object === 'object' && 'id' in searchResults[0].object && searchResults[0].object.id === expectedResults[i].id) {
      correct++;
    }
  }
  return correct / queries.length;
}

// Example queries and expected results for accuracy tests
const queries: Query[] = [
  // ... array of query vectors
];
const expectedResults: ExpectedResult[] = [
  // ... array of expected result objects with at least an 'id' property
];
