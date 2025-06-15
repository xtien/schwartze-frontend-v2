## Aunt Thérèse's niece ##

This is a frontend for my [Schwartze-Ansingh project](https://www.schwartze-ansingh.com).

I have 500 letters from the families Schwartze and Ansingh, written between 1880 and 1940. I have scanned all letters, then I read them and transcribed them (to ascii files), which is time consuming. This application serves to enter the data on the letters, to show the scanned letters and transcripts. After finishing the preparations, I'll continue the research and write a book. The backend is in Java/Spring Boot, the frontend is in React/typescript/vite.

The backend software is at https://www.github.com/xtien/schwartze-backend

The web site is at https://www.schwartze-ansingh.com



#### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

The project uses openapi-generator to generate the api calls from the swagger page of the api.
https://openapi-generator.tech/docs/installation/

```bash
java -jar ./openapi-generator-cli.jar generate -i http://localhost:8084/v3/api-docs -g typescript-axios -pwithSeparateModelsAndApi=true -papiPackage=api -pmodelPackage=model -o ./src/generated-api 
```
