import yaml from 'js-yaml';

const parser = (fileContent, fileExtension) => {
  switch (fileExtension) {
    case 'json':
      return JSON.parse(fileContent, 'utf-8');
    case 'yml':
    case 'yaml':
      return yaml.load(fileContent, 'utf-8');
    default:
      throw new Error('Invalid file extention');
  }
};

export default parser;
