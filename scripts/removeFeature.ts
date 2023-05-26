import { Project, SyntaxKind, Node } from 'ts-morph';

const featureToManage = process.argv[2]; // example ArticleRating
const featureState = process.argv[3]; // example on/off

if (!featureToManage) {
  throw new Error('Missing feature\'s name. Script example: npx ts-node {pathToScript} {featureName} {featureState(on/off)}');
}

if (!featureState) {
  throw new Error('Missing feature\'s state. Script example: npx ts-node {pathToScript} {featureName} {featureState(on/off)}');
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Feature state can only be \'on\' or \'off\'. Script example: npx ts-node {pathToScript} {featureName} {featureState(on/off)}');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
  let isToggleFeatures = false;

  node.forEachChild((child) => {
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

      const nameProperty = objectOptions?.getProperty('name');
      const onProperty = objectOptions?.getProperty('on');
      const offProperty = objectOptions?.getProperty('off');

      // gettext и slice в конце нужны чтобы убрать ковычки
      const name = nameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);
      const on = onProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
      const off = offProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);

      if (name !== featureToManage) return;

      if (featureState === 'on') {
        node.replaceWithText(on?.getBody().getText() ?? '');
      }

      if (featureState === 'off') {
        node.replaceWithText(off?.getBody().getText() ?? '');
      }
    }
  });
});

project.save();
