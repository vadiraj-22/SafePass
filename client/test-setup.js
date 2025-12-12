// Quick setup verification script
const fs = require('fs');
const path = require('path');

console.log('🔍 SafePass Setup Verification\n');

const checks = [];

// Check 1: Frontend dependencies
try {
  const packageJson = require('./package.json');
  const hasAxios = packageJson.dependencies.axios;
  const hasReactRouter = packageJson.dependencies['react-router-dom'];
  checks.push({
    name: 'Frontend Dependencies',
    status: hasAxios && hasReactRouter,
    message: hasAxios && hasReactRouter ? 'axios and react-router-dom installed' : 'Missing dependencies'
  });
} catch (e) {
  checks.push({ name: 'Frontend Dependencies', status: false, message: 'package.json not found' });
}

// Check 2: Backend package.json
try {
  const serverPackage = require('./server/package.json');
  checks.push({
    name: 'Backend Package',
    status: true,
    message: 'server/package.json exists'
  });
} catch (e) {
  checks.push({ name: 'Backend Package', status: false, message: 'server/package.json not found' });
}

// Check 3: Backend .env
const envExists = fs.existsSync(path.join(__dirname, 'server', '.env'));
checks.push({
  name: 'Backend Environment',
  status: envExists,
  message: envExists ? 'server/.env exists' : 'server/.env not found'
});

// Check 4: Auth context
const authContextExists = fs.existsSync(path.join(__dirname, 'src', 'context', 'AuthContext.jsx'));
checks.push({
  name: 'Auth Context',
  status: authContextExists,
  message: authContextExists ? 'AuthContext.jsx exists' : 'AuthContext.jsx not found'
});

// Check 5: Login/Signup pages
const loginExists = fs.existsSync(path.join(__dirname, 'src', 'pages', 'Login.jsx'));
const signupExists = fs.existsSync(path.join(__dirname, 'src', 'pages', 'Signup.jsx'));
checks.push({
  name: 'Auth Pages',
  status: loginExists && signupExists,
  message: loginExists && signupExists ? 'Login and Signup pages exist' : 'Missing auth pages'
});

// Check 6: Protected Route
const protectedRouteExists = fs.existsSync(path.join(__dirname, 'src', 'components', 'ProtectedRoute.jsx'));
checks.push({
  name: 'Protected Route',
  status: protectedRouteExists,
  message: protectedRouteExists ? 'ProtectedRoute.jsx exists' : 'ProtectedRoute.jsx not found'
});

// Check 7: Backend models
const userModelExists = fs.existsSync(path.join(__dirname, 'server', 'models', 'User.js'));
const passwordModelExists = fs.existsSync(path.join(__dirname, 'server', 'models', 'Password.js'));
checks.push({
  name: 'Database Models',
  status: userModelExists && passwordModelExists,
  message: userModelExists && passwordModelExists ? 'User and Password models exist' : 'Missing models'
});

// Check 8: Backend routes
const authRouteExists = fs.existsSync(path.join(__dirname, 'server', 'routes', 'auth.js'));
const passwordRouteExists = fs.existsSync(path.join(__dirname, 'server', 'routes', 'passwords.js'));
checks.push({
  name: 'API Routes',
  status: authRouteExists && passwordRouteExists,
  message: authRouteExists && passwordRouteExists ? 'Auth and Password routes exist' : 'Missing routes'
});

// Print results
console.log('Results:\n');
checks.forEach(check => {
  const icon = check.status ? '✅' : '❌';
  console.log(`${icon} ${check.name}: ${check.message}`);
});

const allPassed = checks.every(check => check.status);

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ All checks passed! Setup is complete.');
  console.log('\nNext steps:');
  console.log('1. Install backend dependencies: cd server && npm install');
  console.log('2. Start MongoDB');
  console.log('3. Run: start-dev.bat (Windows) or start both servers manually');
} else {
  console.log('❌ Some checks failed. Please review the setup.');
  console.log('\nRefer to SETUP.md for detailed instructions.');
}
console.log('='.repeat(50) + '\n');
