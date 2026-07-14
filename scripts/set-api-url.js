const fs = require('fs');
const path = require('path');

const newUrl = process.argv[2];
if (!newUrl) {
    console.error('Error: Please provide your new Alwaysdata API URL as an argument.');
    console.error('Usage: node scripts/set-api-url.js https://yoursubdomain.alwaysdata.net');
    process.exit(1);
}

// Strip trailing slash if present
const targetUrl = newUrl.replace(/\/$/, '');

const files = [
    path.join(__dirname, '../docs/index.md'),
    path.join(__dirname, '../docs/statistics.md'),
    path.join(__dirname, '../docs/status.md')
];

const DEFAULT_URL = 'https://octavia.alwaysdata.net';
const DEFAULT_URL_HOST = 'octavia.alwaysdata.net';

files.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
        console.warn(`Warning: File not found: ${filePath}`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the full URL
    let newContent = content.split(DEFAULT_URL).join(targetUrl);
    // Also catch host-only references (like in markdown tables)
    const hostOnly = targetUrl.replace(/^https?:\/\//, '');
    newContent = newContent.split(DEFAULT_URL_HOST).join(hostOnly);
    
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated API URLs in: ${path.basename(filePath)}`);
    } else {
        console.log(`No changes needed in: ${path.basename(filePath)} (already updated or no matches)`);
    }
});
console.log('API URL update completed successfully!');
