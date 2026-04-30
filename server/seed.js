/**
 * Seed script — populates database with demo user and sample tasks.
 * Run: node seed.js
 */
const bcrypt = require('bcryptjs');
const db = require('./config/database');

async function seed() {
  console.log('🌱 Seeding database...\n');

  // Clear existing data
  db.prepare('DELETE FROM tasks').run();
  db.prepare('DELETE FROM users').run();

  // Create demo user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const userResult = db.prepare(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
  ).run('Alex Johnson', 'demo@taskflow.com', hashedPassword);

  const userId = userResult.lastInsertRowid;
  console.log(`✅ Created demo user: demo@taskflow.com / password123`);

  // Sample tasks with various statuses and deadlines
  const tasks = [
    {
      title: 'Design new landing page',
      description: 'Create a modern, conversion-focused landing page with hero section, features grid, testimonials, and CTA. Use Figma for mockups before development.',
      status: 'in_progress',
      deadline: getFutureDate(2),
    },
    {
      title: 'Set up CI/CD pipeline',
      description: 'Configure GitHub Actions for automated testing, linting, and deployment to staging/production environments. Include Docker containerization.',
      status: 'todo',
      deadline: getFutureDate(5),
    },
    {
      title: 'Implement user authentication',
      description: 'Build JWT-based authentication with registration, login, password reset, and email verification. Include OAuth social login for Google and GitHub.',
      status: 'done',
      deadline: getFutureDate(-3),
    },
    {
      title: 'Write API documentation',
      description: 'Document all REST API endpoints using OpenAPI/Swagger specification. Include request/response examples, error codes, and authentication details.',
      status: 'todo',
      deadline: getFutureDate(7),
    },
    {
      title: 'Optimize database queries',
      description: 'Profile and optimize slow database queries. Add appropriate indexes, implement query caching with Redis, and review N+1 query patterns.',
      status: 'in_progress',
      deadline: getFutureDate(1),
    },
    {
      title: 'Mobile responsive overhaul',
      description: 'Refactor the entire UI to be fully responsive across all device sizes. Focus on touch-friendly interactions and optimized mobile navigation patterns.',
      status: 'todo',
      deadline: getFutureDate(10),
    },
    {
      title: 'Security audit and fixes',
      description: 'Conduct a thorough security audit: XSS prevention, CSRF protection, SQL injection checks, rate limiting, and HTTPS enforcement. Fix all critical vulnerabilities.',
      status: 'done',
      deadline: getFutureDate(-7),
    },
    {
      title: 'Integrate payment gateway',
      description: 'Set up Stripe integration for subscription billing. Implement checkout flow, webhook handlers, invoice generation, and customer portal access.',
      status: 'todo',
      deadline: getFutureDate(14),
    },
    {
      title: 'Performance monitoring setup',
      description: 'Integrate application performance monitoring with Sentry for error tracking and Datadog for metrics. Set up alerting thresholds and dashboards.',
      status: 'in_progress',
      deadline: getFutureDate(3),
    },
    {
      title: 'User onboarding flow',
      description: 'Design and implement a guided onboarding experience for new users. Include welcome tour, sample data creation, and feature highlights with progress tracking.',
      status: 'done',
      deadline: getFutureDate(-1),
    },
  ];

  const insertTask = db.prepare(`
    INSERT INTO tasks (user_id, title, description, status, deadline)
    VALUES (?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((tasks) => {
    for (const task of tasks) {
      insertTask.run(userId, task.title, task.description, task.status, task.deadline);
    }
  });

  insertMany(tasks);
  console.log(`✅ Created ${tasks.length} sample tasks\n`);

  // Print summary
  const stats = db.prepare(`
    SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'todo' THEN 1 ELSE 0 END) as todo,
      SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
      SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) as done
    FROM tasks WHERE user_id = ?
  `).get(userId);

  console.log('📊 Task Summary:');
  console.log(`   Total: ${stats.total}`);
  console.log(`   To Do: ${stats.todo}`);
  console.log(`   In Progress: ${stats.in_progress}`);
  console.log(`   Done: ${stats.done}`);
  console.log('\n🎉 Seed complete! You can now log in with:');
  console.log('   Email: demo@taskflow.com');
  console.log('   Password: password123');
}

/**
 * Returns an ISO date string N days from now.
 * Negative values give past dates.
 */
function getFutureDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

seed().catch(console.error);
