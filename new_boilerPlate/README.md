## Environment setup

###### Before use follow below steps

- Clone it
- Upgrade Node to 18 LTS.
- Update all dependency using `npm update`
- Test boilerplate for any breaking changes
- If everything fine then you can fork this repository.

###### Setup steps

1. `npm i`
2. `npm start`
3. After setup and project runs successfully
4. To make it future proof remove carrot sign from all dependency version in package.json

###### Deployment settings

- Change .gitlab-ci.yml variable to new project server variable.
- Make sure you have correct config in .firebaserc file.

##### Plugins

###### - Required plugins (Must include)

- ESLint (https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Code spell Checker (https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- Prettier (https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

###### - Development productivity

- Auto Close Tag (https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- Simple React Snippest (https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)
- Turbo Console Log (https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log)
  ```
  ctrl + alt + L
  ```

##### Styles and framework

- Ant Design version 5 (https://ant.design)

##### Can't commit using vscode or commandline ?

- we implemented eslint restrictions so this may cause this problem.
- Please make sure you solved all your problems and errors
- To check what's the issue with code please check (output) tab of vscode that shows you error which have to fixed first before commit

##### Having issues related eslint ?

- Before commit please run this `npm run lint` command for checking errors and warnings
- Run below command for fixing eslint issue please check all changes after running below command.
- Command syntax`eslint {foldername} {options}`
- `eslint src --fix`
- This will solve some of syntax issues. other issues you have to fix manually.
- Make sure that all warnings and errors should resolved.

##### Docs (References)

(https://medium.com/netscape/git-hooks-with-husky-8b98f2556363)
Eslint commandline interface (https://eslint.org/docs/user-guide/command-line-interface)
CI-CD (Firebase deployment, FIREBASE_TOKEN config) (https://gitlab.com/help/ci/environments/index.md)
(https://about.gitlab.com/blog/2020/03/16/gitlab-ci-cd-with-firebase/)

##### Notes

- We are currently using older version of below packages because of some compatibility issues in new version. In future if issue are resolved, we'll upgrade the packages
  1. history
  2. husky
  3. less
  4. less-loader
