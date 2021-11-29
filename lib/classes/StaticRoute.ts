export default class StaticRoute {
  path: string;
  content: string[];

  constructor(path: string, content: string | string[]) {
    this.path = path;
    if (content) {
      if (Array.isArray(content)) this.content = [...content];
      else this.content = [content];
    } else {
      this.content = [];
    }
  }
}
