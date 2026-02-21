const fs = require('fs');
const css = fs.readFileSync('style.css', 'utf8');
const classMatches = css.match(/\.[a-zA-Z0-9_-]+/g) || [];
const uniqueClasses = [...new Set(classMatches.map(c => c.slice(1)))];

const filesToSearch = ['index.html', 'app.js', 'components/header.js', 'components/footer.js'];
const contents = filesToSearch.map(f => fs.readFileSync(f, 'utf8')).join('\n');

const unused = [];
for (const c of uniqueClasses) {
    if (!contents.includes(c)) {
        if (!['1', '05', '06', '19', '2', '22', '2s', '3', '3s', '4s', '5', '5px', '5s', '6', '7', '8', '8s', '9', 'active', 'stories-grid', 'stories', '0', '4'].includes(c) && !c.match(/^[0-9]/)) {
            unused.push(c);
        }
    }
}
console.log(unused.join('\n'));
