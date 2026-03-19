const fs = require('fs');
const { execSync } = require('child_process');

// 获取 Git 提交信息
try {
  const commitTime = execSync('git log -1 --format=%cd --date=iso').toString().trim();
  const commitHash = execSync('git log -1 --format=%h').toString().trim();
  const commitMsg = execSync('git log -1 --format=%s').toString().trim();
  
  // 读取 HTML
  let html = fs.readFileSync('index.html', 'utf8');
  
  // 替换占位符
  html = html.replace('{{BUILD_TIME}}', commitTime);
  html = html.replace('{{COMMIT_HASH}}', commitHash);
  html = html.replace('{{COMMIT_MSG}}', commitMsg);
  
  // 写回
  fs.writeFileSync('index.html', html);
  
  console.log('✅ Build info injected:');
  console.log(`  Time: ${commitTime}`);
  console.log(`  Hash: ${commitHash}`);
  console.log(`  Msg: ${commitMsg}`);
} catch (err) {
  console.error('❌ Build failed:', err.message);
  process.exit(1);
}
