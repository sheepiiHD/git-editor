# GitHub-style Contribution Grid (React + TypeScript)

> **Disclaimer**
>
> This project is provided **solely for educational and experimentation purposes.**  
> Use it responsibly and in accordance with GitHub's [Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) & [Acceptable Use Policies](https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies).  
> Generating fake activity to mislead others about your contributions may violate those terms and could lead to account sanctions.

Heya, this project is a minimal, fully-typed React implementation of the familiar GitHub contribution graph. Basically, you run it. Do what you need, and it it'll generate an sh file that you can run in the git repo of your choice. 

**Important:** This is permanent. You cannot take back this decision, so if you have doubts, don't do it. Github saves history, regardless if you delete the repo, try to roll back the commits, or anything. It is irreversable because the historical portion of it is saved to github, not on your git. 

## Quick start

1. Install dependencies

```bash
pnpm install # or npm install / yarn install
```

2. Start the development server

```bash
pnpm dev # or npm run dev
```

3. Navigate to the website
> The app will be available at `http://localhost:5173` (default Vite port).

4. Do your thing
> Make a smiley face or something. :)

5. Make a new private git repo, specifically for this project
> You can make it public, but meh. Just realize it's definitely going to overwrite the git history, so don't do it on an existing project. 

6. Create/drop/run the file
> Should be a `contributions.sh`. Just make it, then drop it in any established git repo (check with git status), and run it with `sh ./contributions.sh` ez pz. This *theoretially* should add git history for those commits. 

If you feel you wanna improve this, just toss up a PR, and I'll look at it when I get time. 

## License

MIT © 2024 
