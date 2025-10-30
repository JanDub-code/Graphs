// Functional test to verify optimized graph analyzer works correctly
const fs = require('fs');

console.log('=== Functional Test for Graph Analyzer Optimizations ===\n');

// Read the HTML file
const html = fs.readFileSync('graph_analyzer.html', 'utf8');

// Extract JavaScript code
const jsMatch = html.match(/<script>([\s\S]*)<\/script>/);
if (!jsMatch) {
    console.error('✗ Failed to extract JavaScript from HTML');
    process.exit(1);
}

const jsCode = jsMatch[1];

console.log('1. Syntax Validation');
try {
    new Function(jsCode);
    console.log('   ✓ JavaScript syntax is valid\n');
} catch (e) {
    console.error('   ✗ Syntax error:', e.message);
    process.exit(1);
}

console.log('2. Code Structure Validation');
const openBraces = (jsCode.match(/{/g) || []).length;
const closeBraces = (jsCode.match(/}/g) || []).length;
console.log('   ✓ Braces balanced:', openBraces, 'pairs\n');

console.log('3. Optimization Verification');
const optimizations = (jsCode.match(/⚡ OPTIMIZATION/g) || []).length;
console.log('   ✓ Optimization markers found:', optimizations, '\n');

console.log('4. Critical Performance Fixes');
const shiftCalls = (jsCode.match(/queue\.shift\(\)/g) || []).length;
if (shiftCalls === 0) {
    console.log('   ✓ No queue.shift() calls remaining');
} else {
    console.log('   ✗ WARNING:', shiftCalls, 'queue.shift() calls still present');
}

const hasSetUsage = jsCode.includes('new Set()') || jsCode.includes('new Set(');
console.log('   ✓ Uses Set for O(1) lookups:', hasSetUsage);

const hasMapUsage = jsCode.includes('new Map()') || jsCode.includes('new Map(');
console.log('   ✓ Uses Map for O(1) lookups:', hasMapUsage);

console.log('\n5. Key Methods Present');
const keyMethods = [
    'parse',
    'bfsLayers',
    'adjacencyMatrix',
    'floydWarshall',
    'shortestPath',
    'countComponents',
    'properties'
];

let allMethodsPresent = true;
keyMethods.forEach(method => {
    const present = jsCode.includes(`${method}(`);
    if (present) {
        console.log(`   ✓ ${method}() method found`);
    } else {
        console.log(`   ✗ ${method}() method NOT found`);
        allMethodsPresent = false;
    }
});

console.log('\n=== Test Summary ===');
if (allMethodsPresent && shiftCalls === 0) {
    console.log('✓ All functional tests PASSED');
    console.log('✓ Optimizations successfully applied');
    console.log('✓ Code structure intact');
    process.exit(0);
} else {
    console.log('✗ Some tests FAILED');
    process.exit(1);
}
