import * as fs from 'fs';

const rColor = /(#[a-fA-F0-9]{3,8}|@[-\w]+)/;
const rAny = /[-\w]+/;

let variables: Record<string, string> = {};
let stylesDefault: Record<string, string>;
let stylesDark: Record<string, string>;

for (const line of fs.readFileSync('src/styles/_variables.scss', 'utf8').split('\n')) {
  if (line.startsWith('$')) {
    const [name, value] = line.trim().slice(1, -1).split(':');
    variables[name.trim()] = value.trim();
  }
}

const parseStyles = (data: string) => {
  let styles: Record<string, string> = {};
  for (const line of data.split('\n')) {
    if (line.startsWith('$')) {
      const [name, value] = line.trim().slice(1, -1).split(':');
      if (value.trim().startsWith('$')) {
        styles[name.trim()] = variables[value.trim().slice(1)];
      } else {
        styles[name.trim()] = value.trim();
      }
    }
  }
  return styles
};

stylesDefault = parseStyles(fs.readFileSync('src/styles/antd.scss', 'utf8'));
stylesDark = parseStyles(fs.readFileSync('src/styles/antd.dark.scss', 'utf8'));

const parseLess = (path: string, styles: Record<string, string>) => {
  let result = fs.readFileSync(path, 'utf8');
  (Object.keys(styles) as Array<string>).forEach(key => {
    let regex = /.*/;
    if (rColor.test(styles[key])) {
      regex = rColor;
    } else if (rAny.test(styles[key])) {
      regex = rAny;
    }
    result = result.replace(new RegExp(`@${key}: *${`${regex}`.slice(1, -1)};`), `@${key}: ${styles[key]};`);
  });
  fs.writeFileSync(path, result);
};

parseLess('node_modules/antd/lib/style/themes/default.less', stylesDefault);
parseLess('node_modules/antd/lib/style/themes/dark.less', stylesDark);
