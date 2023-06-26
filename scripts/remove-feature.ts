import {
  Project, SyntaxKind, Node, JsxAttribute,
} from 'ts-morph';

const featureToManage = process.argv[2]; // example ArticleRating
const featureState = process.argv[3]; // example on/off

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

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
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
}

function isToggleComponent(node: Node) {
  let isToggleFeatures = false;

  node.forEachChild((child) => {
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleComponentName) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
}

const replaceToggleFunction = (node: Node) => {
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
};

const getAttributeNodeByName = (
  jsxAttributes: JsxAttribute[],
  name: string,
) => jsxAttributes.find((node) => node.getName() === name);

const getComponentToReplace = (attribute: JsxAttribute) => {
  const value = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()?.getText();

  if (value?.startsWith('(')) {
    return value.slice(1, -1);
  }

  return value;
};

const replaceToggleComponent = (node: Node) => {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const onAttribute = getAttributeNodeByName(attributes, 'on');
  const offAttribute = getAttributeNodeByName(attributes, 'off');
  const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');

  const featureName = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    ?.slice(1, -1);

  if (featureName !== featureToManage || !offAttribute || !onAttribute) return;

  const offValue = getComponentToReplace(offAttribute);

  const onValue = getComponentToReplace(onAttribute);

  if (featureState === 'on' && onValue) {
    node.replaceWithText(onValue);
  }

  if (featureState === 'off' && offValue) {
    node.replaceWithText(offValue);
  }
};

files.forEach((sourceFile) => {
  // eslint-disable-next-line
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      return replaceToggleFunction(node);
    }

    if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
      return replaceToggleComponent(node);
    }
  });
});

project.save();
