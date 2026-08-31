// Absolutely. Your screenshot is describing **how AI is added to a traditional application**, why **LLM context becomes expensive**, and how **RAG (Retrieval-Augmented Generation)** helps solve that problem.

// I’ve reorganized your handwritten points into proper system-design notes below.

// # AI System Design — Structured Notes

// ## 1. Traditional Application

// A traditional application generally looks like:

// ```text
// User
//   ↓
// Frontend
//   ↓
// Backend / REST APIs
//   ↓
// Database
// ```

// Example:

// ```text
// Instagram
//    ↓
// GET /posts
// GET /comments?postId=1
//    ↓
// Database
// ```

// The application is built around **predefined features and APIs**.

// For example:

// ```http
// GET /comments?postId=1
// ```

// returns comments.

// But the user cannot arbitrarily ask:

// > "Give me all comments from Post 1 that are positive, sort them by relevance, and summarize them."

// The developer would normally need to create a specific feature/API for this.

// ### Limitation of traditional applications

// ```text
// New requirement
//       ↓
// Developer writes feature
//       ↓
// New API / logic
//       ↓
// Deploy
// ```

// So:

// > **Traditional applications are feature-driven.**

// ---

// # 2. AI Changes the Interaction Model

// With an LLM, users can use **natural language**.

// Instead of:

// ```http
// GET /comments?postId=1
// ```

// the user can say:

// > "Give me all the comments of post 1."

// or:

// > "Summarize the comments."

// or:

// > "Sort the comments by relevance."

// The AI can understand the natural-language request and decide what information is needed.

// Conceptually:

// ```text
// User
//   ↓
// Natural Language
//   ↓
// LLM
//   ↓
// Application tools / APIs
//   ↓
// Database
// ```

// This means AI can provide a **new interface on top of existing application functionality**.

// ---

// # 3. Two Ways to Build AI Applications

// Your screenshot is essentially distinguishing between **pure AI applications** and **AI integrated into existing applications**.

// ## A. Pure AI Application

// The AI itself is the main product.

// Examples:

// ```text
// ChatGPT
// Claude
// Image Generation
// Voice Generation
// ```

// Architecture:

// ```text
// User
//   ↓
// AI Application
//   ↓
// LLM / AI Model
// ```

// The primary purpose of the application is interaction with AI.

// ---

// ## B. Existing Application + AI

// You already have an application:

// ```text
// Existing Application
//         +
//        AI
// ```

// For example:

// ```text
// Instagram
//      +
// AI Agent
// ```

// The AI becomes an additional interface to the existing application.

// A user might ask:

// > "Tell me my best comments from the last 1 week."

// The AI could potentially:

// ```text
// 1. Understand request
// 2. Determine required data
// 3. Call Instagram APIs
// 4. Retrieve comments
// 5. Analyze them
// 6. Return an answer
// ```

// Architecture:

// ```text
// User
//  ↓
// AI Agent / LLM
//  ↓
// Tools / APIs
//  ↓
// Existing Backend
//  ↓
// Database
// ```

// ### Important idea

// > **AI doesn't necessarily replace the existing application. It can sit on top of the existing application and use its APIs as tools.**

// ---

// # 4. What is an LLM?

// **LLM = Large Language Model**

// Examples:

// ```text
// GPT
// Claude
// Gemini
// Llama
// ```

// Your screenshot breaks GPT into:

// ```text
// G → Generative
// P → Pre-trained
// T → Transformer
// ```

// ### Generative

// It generates output:

// ```text
// Text
// Code
// Answers
// Summaries
// ```

// ### Pre-trained

// Before you interact with it, the model has already been trained on a very large amount of data.

// ### Transformer

// Transformer is the neural-network architecture behind modern LLMs.

// ---

// # 5. Important: LLM Is Prediction

// One of the key ideas in your screenshot is:

// > **AI is not magic; it is prediction.**

// At a simplified level, an LLM predicts the **next token** based on the previous tokens.

// Example:

// ```text
// Input:

// "Hello, how are"

// Model predicts:

// "you"
// ```

// Then:

// ```text
// "Hello, how are you"
// ```

// The next token might be:

// ```text
// "I"
// ```

// and so on.

// Conceptually:

// ```text
// Prompt
//   ↓
// Tokens
//   ↓
// Model prediction
//   ↓
// Next token
//   ↓
// Next token
//   ↓
// Next token
//   ↓
// Final response
// ```

// ---

// # 6. What is a Token?

// A token is a unit of text processed by the model.

// It can be:

// ```text
// A word
// A part of a word
// Punctuation
// Symbols
// ```

// For example:

// ```text
// "MongoDB is powerful"
// ```

// might be broken into several tokens.

// The exact tokenization depends on the model/tokenizer.

// ### Important concept

// LLMs do not literally "think in paragraphs."

// They process sequences of **tokens**.

// ---

// # 7. Context Window

// This is one of the most important concepts from your diagram.

// The **context window** is the amount of information the model can consider in a single request.

// Think:

// ```text
// LLM Context
// ┌──────────────────────────┐
// │ System instructions      │
// │ Conversation history     │
// │ User prompt              │
// │ Documents                │
// │ Tool results              │
// └──────────────────────────┘
// ```

// All of this consumes tokens.

// ---

// # 8. Why Context Becomes Expensive

// Suppose a user uploads:

// ```text
// 250 PDF files
// ```

// and each PDF contains lots of text.

// A naive approach might be:

// ```text
// 250 PDFs
//    ↓
// Extract everything
//    ↓
// Put everything into prompt
//    ↓
// LLM
// ```

// This creates a huge context.

// Problems:

// ```text
// Large context
//     ↓
// More tokens
//     ↓
// Higher cost
//     ↓
// More latency
//     ↓
// Potential context-window limits
// ```

// So your screenshot's point:

// > **AI context is costly.**

// is very important in system design.

// ---

// # 9. Naive PDF Question Answering

// Suppose a user uploads:

// ```text
// 200–250 PDFs
// ```

// Then asks:

// > "What is mentioned on page 20 of this PDF?"

// A naive architecture could be:

// ```text
// PDF files
//    ↓
// Extract all text
//    ↓
// Send huge text to LLM
//    ↓
// Ask question
// ```

// This is inefficient because you're sending lots of irrelevant information.

// For example, if the answer exists in **one paragraph**, there is no reason to send the contents of 250 documents.

// ---

// # 10. RAG

// This leads to **RAG**.

// ### RAG = Retrieval-Augmented Generation

// Instead of giving the LLM everything, we first **retrieve the relevant information**, then give only that information to the model.

// Architecture:

// ```text
// User Question
//       ↓
//    Retrieval
//       ↓
// Relevant Documents / Chunks
//       ↓
//      LLM
//       ↓
//     Answer
// ```

// ---

// # 11. RAG with PDFs

// Suppose the user uploads:

// ```text
// 250 PDFs
// ```

// We can process them like this:

// ```text
// 250 PDFs
//    ↓
// Extract text
//    ↓
// Split into chunks
//    ↓
// Generate embeddings
//    ↓
// Store embeddings
//    ↓
// Vector Database
// ```

// Later:

// ```text
// User:
// "What is mentioned about onboarding?"
//         ↓
// Convert question to embedding
//         ↓
// Similarity search
//         ↓
// Retrieve relevant chunks
//         ↓
// Send chunks + question to LLM
//         ↓
// Answer
// ```

// ---

// # 12. Embeddings

// An **embedding** is a numerical representation of data that captures semantic meaning.

// Conceptually:

// ```text
// "How to reset password?"
//           ↓
//      Embedding
//           ↓
// [0.12, -0.43, 0.78, ...]
// ```

// Another sentence with similar meaning may have a nearby vector.

// Therefore:

// ```text
// Question
//    ↓
// Embedding
//    ↓
// Similarity Search
//    ↓
// Relevant content
// ```

// ---

// # 13. Vector Database

// Embeddings are commonly stored in a **vector database** or vector-capable storage system.

// Examples:

// ```text
// Pinecone
// Milvus
// Weaviate
// Qdrant
// pgvector
// MongoDB Atlas Vector Search
// ```

// Architecture:

// ```text
// PDF
//  ↓
// Chunk
//  ↓
// Embedding
//  ↓
// Vector DB
// ```

// Then:

// ```text
// Question
//  ↓
// Embedding
//  ↓
// Vector DB search
//  ↓
// Top relevant chunks
// ```

// ---

// # 14. RAG Full Architecture

// For your system-design notes, remember this architecture:

// ```text
//                  USER
//                    │
//                    ▼
//              Frontend / API
//                    │
//                    ▼
//               AI Agent / LLM
//                    │
//              User Question
//                    │
//                    ▼
//               Embedding Model
//                    │
//                    ▼
//               Vector Database
//                    │
//              Top-K Chunks
//                    │
//                    ▼
//             Context Builder
//                    │
//                    ▼
//                  LLM
//                    │
//                    ▼
//                Response
// ```

// ---

// # 15. Why RAG Is Better Than Sending Everything

// ### Naive approach

// ```text
// 250 PDFs
//  ↓
// Entire content
//  ↓
// LLM
// ```

// Problems:

// ```text
// ❌ High token usage
// ❌ Expensive
// ❌ Slow
// ❌ Context window limitations
// ❌ Lots of irrelevant information
// ```

// ### RAG approach

// ```text
// 250 PDFs
//  ↓
// Index once
//  ↓
// Question
//  ↓
// Retrieve only relevant chunks
//  ↓
// LLM
// ```

// Benefits:

// ```text
// ✅ Less context
// ✅ Lower cost
// ✅ Lower latency
// ✅ Better relevance
// ✅ Can handle large document collections
// ```

// ---

// # 16. AI Agent

// Your screenshot also mentions an **AI Agent**.

// An AI agent is more than simply:

// ```text
// Question → LLM → Answer
// ```

// An agent can:

// ```text
// Understand task
//      ↓
// Choose tool
//      ↓
// Call API
//      ↓
// Read result
//      ↓
// Choose next action
//      ↓
// Return answer
// ```

// Example:

// > "Tell me my best Instagram comments from last week."

// The agent could decide:

// ```text
// Need comments
//       ↓
// Call Instagram API
//       ↓
// Get comments
//       ↓
// Filter by date
//       ↓
// Rank / analyze
//       ↓
// Summarize
// ```

// ---

// # 17. AI Agent vs Normal Chatbot

// ### Normal chatbot

// ```text
// User
//  ↓
// LLM
//  ↓
// Answer
// ```

// ### Agent

// ```text
// User
//  ↓
// LLM / Agent
//  ↓
// Think about required action
//  ↓
// Tool/API
//  ↓
// Result
//  ↓
// LLM
//  ↓
// Final Answer
// ```

// An agent can interact with the **outside world through tools**.

// Examples of tools:

// ```text
// Database
// REST API
// Search
// Calculator
// Email
// Calendar
// File system
// Payment API
// ```

// ---

// # 18. Example: Existing Instagram Application + AI

// Suppose Instagram already provides:

// ```http
// GET /posts
// GET /comments
// GET /likes
// GET /profile
// ```

// We can build:

// ```text
//                 User
//                   ↓
//               AI Agent
//                   ↓
//           ┌───────┼────────┐
//           ↓       ↓        ↓
//        Posts   Comments   Likes
//         API      API       API
//           │       │        │
//           └───────┼────────┘
//                   ↓
//                  LLM
//                   ↓
//                Answer
// ```

// User asks:

// > "Which of my comments performed best this month?"

// The AI agent uses existing APIs rather than requiring a completely new backend system.

// ---

// # 19. AI System Design — Key Components

// When designing an AI-powered system, think about these components:

// ### Application layer

// ```text
// Frontend
// Backend
// Authentication
// APIs
// ```

// ### AI layer

// ```text
// LLM
// Prompt
// Agent
// Tool calling
// ```

// ### Knowledge layer

// ```text
// Documents
// Embeddings
// Vector database
// RAG
// ```

// ### Data layer

// ```text
// SQL
// NoSQL
// Object storage
// Cache
// ```

// ### Infrastructure

// ```text
// Load Balancer
// Queue
// Workers
// Monitoring
// Rate limiting
// ```

// ---

// # 20. Important Design Questions

// For an AI system-design interview, ask:

// ### Data

// ```text
// Where does the data come from?
// ```

// ### Context

// ```text
// How much information needs to go to the LLM?
// ```

// ### Cost

// ```text
// How many tokens are we sending?
// ```

// ### Latency

// ```text
// How quickly must the answer be returned?
// ```

// ### Retrieval

// ```text
// Do we need RAG?
// ```

// ### Model

// ```text
// Which model should we use?
// ```

// ### Reliability

// ```text
// What happens if the LLM fails?
// ```

// ### Security

// ```text
// Can users access documents they don't have permission to see?
// ```

// ### Scalability

// ```text
// What happens when 100K users use the AI simultaneously?
// ```

// ---

// # 21. Most Important Concepts From Your Screenshot

// Your entire screenshot can be reduced to this flow:

// ```text
// TRADITIONAL APPLICATION
//         ↓
// Features + REST APIs
//         ↓
// User must follow predefined functionality


// AI-POWERED APPLICATION
//         ↓
// Natural Language
//         ↓
// LLM
//         ↓
// Reason about request
//         ↓
// Use APIs / Tools
//         ↓
// Return answer


// PROBLEM
//         ↓
// Too much context
//         ↓
// High token cost + latency


// SOLUTION
//         ↓
// RAG
//         ↓
// Retrieve only relevant information
//         ↓
// Send relevant context to LLM
//         ↓
// Generate answer
// ```

// ## Interview-ready definitions

// **LLM:**

// > A large language model is a neural-network model trained on large amounts of data to predict and generate sequences of tokens.

// **Token:**

// > A token is a unit of text processed by an LLM, such as a word, subword, or punctuation.

// **Context window:**

// > The context window is the amount of tokenized information a model can process as context for a request.

// **AI Agent:**

// > An AI agent is an AI system that can reason about a task and use tools or external systems to accomplish it.

// **RAG:**

// > Retrieval-Augmented Generation retrieves relevant external information and provides it to an LLM before generating the answer.

// **Embedding:**

// > An embedding is a numerical vector representation of data used to measure semantic similarity.

// **Vector Database:**

// > A database optimized for storing and searching vector embeddings based on similarity.

// ### The biggest takeaway from your screenshot

// > **Traditional software exposes predefined features. AI allows natural-language interaction with those features. But because LLM context is expensive, we retrieve only the relevant data using RAG instead of sending the entire dataset to the model.**

// That is the central **AI system-design story** your screenshot is trying to capture.


// //(2)Page ScreenShot
// This screenshot continues the **AI System Design / RAG** discussion. The main topic is:

// > **How do we answer questions from 200–250 PDF files efficiently without sending all PDFs to the LLM?**

// I’ve organized the whole diagram into proper notes and corrected a few design points.

// # AI System Design — PDF Q&A, Naive Solution & RAG

// ## 1. Problem Statement

// Suppose a user uploads:

// ```text
// 200–250 PDF files
// ```

// Each PDF may contain hundreds of pages.

// The user can ask:

// > **“What is on page 20?”**

// or:

// > **“Where is networking mentioned in these PDFs?”**

// or:

// > **“What is the difference between A and B?”**

// We need to answer these questions without unnecessarily sending the entire PDF collection to the LLM.

// ---

// # 2. Naive Solution — Send Everything to LLM

// The simplest idea is:

// ```text
// 200–250 PDFs
//       ↓
// Extract all text
//       ↓
// Put everything into prompt
//       ↓
// LLM
//       ↓
// Answer
// ```

// For example:

// ```text
// PDF 1 → Content
// PDF 2 → Content
// PDF 3 → Content
// ...
// PDF 250 → Content
//           ↓
//         LLM
// ```

// ### Problem

// The context becomes enormous.

// ```text
// Huge documents
//       ↓
// Huge prompt
//       ↓
// More tokens
//       ↓
// Higher cost
//       ↓
// Higher latency
//       ↓
// Context-window limitations
// ```

// So the naive approach doesn't scale well.

// ---

// # 3. HashMap Idea in Your Diagram

// Your screenshot has:

// ```text
// HashMap {1 = content, 2 = content}
// ```

// This represents storing content in memory mapped to an identifier.

// For example:

// ```javascript
// const pages = new Map();

// pages.set(1, "Page 1 content");
// pages.set(2, "Page 2 content");
// pages.set(3, "Page 3 content");
// ```

// Then:

// ```javascript
// pages.get(20);
// ```

// could directly retrieve page 20.

// ### But there is an important distinction

// A HashMap can make **exact page lookup fast**, but it does **not solve semantic search**.

// For example:

// ```text
// "What is on page 20?"
// ```

// → HashMap/page indexing works well.

// But:

// ```text
// "Where is networking discussed?"
// ```

// → You don't know the page number beforehand, so you need search/retrieval.

// ---

// # 4. Exact Page Number Query

// Suppose the user asks:

// > **“What is on page 20?”**

// Your diagram suggests:

// ```text
// User
//  ↓
// LLM
//  ↓
// Identify page number
//  ↓
// 20
//  ↓
// JS code
//  ↓
// fs.readFile(page 20)
//  ↓
// LLM
//  ↓
// Answer
// ```

// There is a useful idea here:

// ### Step 1

// Understand the user's request.

// ```text
// "What is on page 20?"
// ```

// ### Step 2

// Determine:

// ```text
// pageNumber = 20
// ```

// ### Step 3

// Application code retrieves page 20.

// For example, conceptually:

// ```javascript
// const page = await getPdfPage(pdfFile, 20);
// ```

// ### Step 4

// Send only that page to the LLM:

// ```text
// Page 20
//    ↓
// LLM
//    ↓
// Answer
// ```

// This is much better than sending 250 PDFs.

// ---

// # 5. Important Design Correction

// You **don't actually need an LLM to identify `20`** when the request clearly contains:

// ```text
// "What is on page 20?"
// ```

// Normal application code can extract this.

// For example:

// ```javascript
// const match = question.match(/page\s+(\d+)/i);

// const pageNumber = Number(match[1]);
// ```

// Then:

// ```javascript
// const pageContent = await getPage(pdf, pageNumber);
// ```

// Then send the result to the LLM.

// This is generally **cheaper, faster and more deterministic**.

// So a good architecture is:

// ```text
// User
//  ↓
// Request understanding
//  ↓
// Deterministic parser
//  ↓
// pageNumber = 20
//  ↓
// Retrieve page 20
//  ↓
// LLM
//  ↓
// Answer
// ```

// The LLM should be used where language understanding/generation is actually needed.

// ---

// # 6. “What is on Page 20?”

// For a single known PDF:

// ```text
// PDF
//  ↓
// Page 20
//  ↓
// Extract text
//  ↓
// LLM
//  ↓
// Answer
// ```

// There is no reason to process every page.

// ### Complexity intuition

// Naive:

// ```text
// 250 PDFs × all pages
// ```

// Better:

// ```text
// 1 PDF × 1 page
// ```

// ---

// # 7. Different Problem: “Where is Networking Mentioned?”

// Now consider:

// > **“Where in this PDF is networking mentioned?”**

// Now the page number isn't known.

// Your screenshot shows:

// ```text
// SCAN of all pages
//        ↓
// Keywords
//        ↓
// Networking
// ```

// One possible approach is:

// ```javascript
// for (const page of pages) {
//     if (/networking/i.test(page)) {
//         results.push(page);
//     }
// }
// ```

// This is basically keyword searching.

// ### Example

// ```text
// Page 1 → No
// Page 2 → No
// Page 3 → "Networking"
// Page 4 → No
// Page 5 → "Network architecture"
// ```

// Result:

// ```text
// Networking found on pages 3 and 5
// ```

// This can be useful for exact keyword searches.

// ---

// # 8. Problem With Keyword Search

// Suppose the document says:

// ```text
// "TCP/IP communication between distributed systems"
// ```

// The user asks:

// > “Where is networking discussed?”

// The exact word **networking** may not appear.

// A simple regex:

// ```javascript
// /networking/i
// ```

// would miss it.

// That's where **semantic search** becomes useful.

// ---

// # 9. Better Solution — RAG

// Instead of scanning everything every time:

// ```text
// PDFs
//  ↓
// Process once
//  ↓
// Chunk content
//  ↓
// Generate embeddings
//  ↓
// Store vectors
// ```

// Then when the user asks a question:

// ```text
// Question
//  ↓
// Embedding
//  ↓
// Vector Search
//  ↓
// Relevant chunks
//  ↓
// LLM
//  ↓
// Answer
// ```

// This is **RAG — Retrieval-Augmented Generation**.

// ---

// # 10. PDF RAG Architecture

// A production-oriented design looks like:

// ```text
//                  PDF Upload
//                      ↓
//               Object Storage
//                      ↓
//                  PDF Parser
//                      ↓
//                 Text Extraction
//                      ↓
//                   Chunking
//                      ↓
//                 Embedding Model
//                      ↓
//                 Vector Database
// ```

// Later:

// ```text
//              User Question
//                    ↓
//               Query Embedding
//                    ↓
//               Vector Search
//                    ↓
//              Top-K Chunks
//                    ↓
//              Context Builder
//                    ↓
//                   LLM
//                    ↓
//                 Response
// ```

// ---

// # 11. Why Chunking?

// Don't put an entire 500-page PDF into one vector.

// Instead:

// ```text
// PDF
//  ↓
// Pages
//  ↓
// Sections
//  ↓
// Chunks
// ```

// For example:

// ```text
// Chunk 1 → Introduction
// Chunk 2 → Network architecture
// Chunk 3 → TCP/IP
// Chunk 4 → Routing
// Chunk 5 → Security
// ```

// Each chunk gets its own embedding.

// Then a question such as:

// > “Explain the section about routing.”

// can retrieve:

// ```text
// Chunk 4
// ```

// rather than the entire document.

// ---

// # 12. Metadata Is Very Important

// When storing embeddings, don't store just:

// ```text
// embedding
// ```

// Store metadata as well:

// ```json
// {
//   "documentId": "pdf123",
//   "pageNumber": 20,
//   "chunkId": "chunk-45",
//   "text": "Networking is...",
//   "embedding": [...]
// }
// ```

// Then the system knows:

// ```text
// This chunk came from:
// PDF → pdf123
// Page → 20
// ```

// This makes citations and page references possible.

// ---

// # 13. Exact Page Search vs Semantic Search

// These are two different problems.

// ### Exact lookup

// User:

// > “What is on page 20?”

// Use:

// ```text
// Page number
//     ↓
// Direct retrieval
// ```

// You don't need vector search.

// ### Semantic lookup

// User:

// > “Where is networking discussed?”

// Use:

// ```text
// Question
//    ↓
// Embedding
//    ↓
// Vector search
//    ↓
// Relevant pages/chunks
// ```

// ### Keyword lookup

// User:

// > “Find every occurrence of `networking`.”

// Use:

// ```text
// Keyword search / full-text search
// ```

// So a strong system often supports **all three**.

// ---

// # 14. Hybrid Retrieval

// A production system can combine:

// ```text
// Keyword Search
//       +
// Vector Search
//       ↓
// Hybrid Retrieval
// ```

// For example:

// ```text
// User Query
//    ↓
//  ┌───────────────┐
//  │               │
// Keyword       Vector
// Search        Search
//  │               │
//  └───────┬───────┘
//          ↓
//       Ranking
//          ↓
//      Top Results
//          ↓
//         LLM
// ```

// This can be more robust than using only one retrieval technique.

// ---

// # 15. Why RAG Saves Money

// Without RAG:

// ```text
// 250 PDFs
//  ↓
// Huge context
//  ↓
// LLM
// ```

// Every question may require a huge amount of input.

// With RAG:

// ```text
// 250 PDFs
//  ↓
// Indexed once
//  ↓
// Question
//  ↓
// Retrieve 5–10 relevant chunks
//  ↓
// LLM
// ```

// Instead of:

// ```text
// 250 PDFs → LLM
// ```

// you have:

// ```text
// 5–10 relevant chunks → LLM
// ```

// So:

// ```text
// Less context
//    ↓
// Fewer tokens
//    ↓
// Lower cost
//    ↓
// Lower latency
// ```

// ---

// # 16. RAG Does Not Mean “LLM Stores the PDFs”

// This is an important interview point.

// The LLM does not need to permanently memorize your PDF.

// Instead:

// ```text
// PDF
//  ↓
// External storage + vector index
// ```

// At query time:

// ```text
// Question
//  ↓
// Retrieve relevant information
//  ↓
// Provide it to LLM
//  ↓
// Generate response
// ```

// So the knowledge remains in your **data layer**, while the LLM receives the relevant context when needed.

// ---

// # 17. Where Does the PDF Actually Live?

// A practical architecture could be:

// ```text
// User
//  ↓
// Backend
//  ↓
// Object Storage
//  ├── S3
//  ├── Azure Blob
//  └── GCS
// ```

// Then metadata:

// ```text
// PostgreSQL / MongoDB
// ```

// and embeddings:

// ```text
// Vector DB
//  ├── Pinecone
//  ├── Qdrant
//  ├── Weaviate
//  ├── Milvus
//  └── pgvector
// ```

// ---

// # 18. Complete System

// For your interview notes, remember this architecture:

// ```text
//                          USER
//                            │
//                            ▼
//                       API / Backend
//                            │
//                            ▼
//                      Query Analysis
//                            │
//              ┌─────────────┼─────────────┐
//              │             │             │
//              ▼             ▼             ▼
//         Page Lookup   Keyword Search   Vector Search
//              │             │             │
//              └─────────────┼─────────────┘
//                            ▼
//                        Top Results
//                            │
//                            ▼
//                     Context Builder
//                            │
//                            ▼
//                           LLM
//                            │
//                            ▼
//                         Answer
// ```

// ---

// # 19. Ingestion Pipeline

// When the user uploads PDFs:

// ```text
// PDF Upload
//     ↓
// Object Storage
//     ↓
// PDF Extraction
//     ↓
// Page Detection
//     ↓
// Chunking
//     ↓
// Embedding Generation
//     ↓
// Vector DB
// ```

// Store:

// ```text
// documentId
// pageNumber
// chunkId
// text
// embedding
// metadata
// ```

// ---

// # 20. Query Pipeline

// When user asks:

// > “Where is networking discussed?”

// ```text
// Question
//    ↓
// Embedding
//    ↓
// Vector Search
//    ↓
// Top 5 / Top 10 chunks
//    ↓
// Metadata
//    ↓
// Pages 19, 20, 21...
//    ↓
// LLM
//    ↓
// Answer
// ```

// For example:

// ```text
// Networking is discussed on:
// Page 19
// Page 20
// Page 21
// ```

// Then the system can provide the relevant excerpts.

// ---

// # 21. The “25–50K” Point in Your Diagram

// Your screenshot contains:

// ```text
// 55,000
// RAG
// ```

// This looks like a discussion about **large context/token counts and how retrieval can reduce the amount of information sent to the model**.

// The exact number shouldn't be treated as a universal threshold.

// The important principle is:

// ```text
// More context
//      ↓
// More input tokens
//      ↓
// More processing/cost
// ```

// So design the system to retrieve **only relevant context**, rather than blindly maximizing the context window.

// ---

// # 22. Important System Design Insight

// Your diagram is actually showing a progression:

// ### Version 1 — Naive

// ```text
// All PDFs
//    ↓
// LLM
// ```

// ❌ Expensive
// ❌ Slow
// ❌ Doesn't scale

// ### Version 2 — Page lookup

// ```text
// Question
//    ↓
// Identify page
//    ↓
// Read page
//    ↓
// LLM
// ```

// ✅ Great for explicit page queries

// ### Version 3 — Keyword search

// ```text
// Question
//    ↓
// Keyword
//    ↓
// Scan/index pages
//    ↓
// Matching pages
//    ↓
// LLM
// ```

// ✅ Good for exact terms

// ### Version 4 — RAG

// ```text
// Question
//    ↓
// Embedding
//    ↓
// Vector search
//    ↓
// Relevant chunks
//    ↓
// LLM
// ```

// ✅ Semantic search
// ✅ Scalable
// ✅ Lower context
// ✅ Better for natural-language questions

// ### Version 5 — Hybrid RAG

// ```text
// Keyword Search
//        +
// Vector Search
//        +
// Metadata filters
//        ↓
// Reranking
//        ↓
// LLM
// ```

// ✅ More production-ready

// ---

// # Interview Questions From This Topic

// ### Why not send the whole PDF to the LLM?

// > Because large contexts increase token usage, cost, latency and can exceed the model's context limits. Retrieval lets us send only relevant information.

// ### Why use RAG?

// > To retrieve relevant external knowledge at query time and provide it to the LLM for generation.

// ### Why use embeddings?

// > To represent text semantically so related queries and documents can be matched even when they don't use the exact same words.

// ### Why store page numbers?

// > To maintain document provenance and allow the system to return the exact source page to the user.

// ### Is vector search always necessary?

// > No. Exact page lookup and exact keyword searches can be handled more efficiently with deterministic methods. Vector search is useful when the query is semantic or the relevant location isn't known beforehand.

// ---

// # The Main Story of Your Diagram

// ```text
//              200–250 PDFs
//                    ↓
//           Naive: Send everything
//                    ↓
//             ❌ Too expensive
//                    ↓
//         Try direct page retrieval
//                    ↓
//       Good when page number is known
//                    ↓
//         Try keyword/full-text search
//                    ↓
//        Good for exact word matching
//                    ↓
//              Need semantic search
//                    ↓
//                  RAG
//                    ↓
//        Retrieve relevant chunks only
//                    ↓
//                   LLM
//                    ↓
//                 Answer
// ```

// ### One-line interview answer

// > **For a large PDF-Q&A system, we shouldn't send all documents to the LLM; we preprocess and index the documents, retrieve only the relevant pages/chunks for each query, and provide that retrieved context to the LLM using RAG.**

// And one of the **most important design lessons from your screenshot** is:

// > **Use deterministic code for deterministic tasks, and use the LLM only where language understanding or generation is actually required.**


//(3)Page ScreenShot


