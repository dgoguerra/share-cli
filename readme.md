# @dgoguerra/share-cli

Share a file or script output through Ngrok with auth.

## Installation

Install with:

```
npm install -g @dgoguerra/share-cli
```

## CLI Usage

Share a file:

```
$ share /path/to/myfile.txt
Download from remote terminal:

  curl https://b878d69a:c8b7df10@c6874506.ngrok.io > myfile.txt
```

Share output of a script:

```
$ cat myfile.log | share
Warning: no file argument, streaming stdin.

Download from remote terminal:

  curl https://f30f0be6:22701534@eee44422.ngrok.io > output.txt
```
