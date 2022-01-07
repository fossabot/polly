# Polly

[![Add to server](https://img.shields.io/badge/Polly-Add%20to%20server-brightgreen?logo=discord&style=for-the-badge)](https://discord.com/oauth2/authorize?client_id=812350686041735168&permissions=3072&scope=bot%20applications.commands)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FGHOSCHT%2Fpolly.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FGHOSCHT%2Fpolly?ref=badge_shield)

It's just a ripoff of [Simple Poll](https://top.gg/bot/simplepoll) to get the feeling for the Discord Bot API.

## Getting Started

### Installation

1. Place your bot token  in ``docker-compose.yml``

2. Start the bot with docker-compose

```sh
docker-compose up -d
```

### Manual Build

1. Clone the repo

```sh
git clone https://github.com/GHOSCHT/polly.git
```

2. Install NPM packages

```sh
yarn
```

3. Create a .env file containing the bot token in the root dictionary

```
TOKEN=<YOURTOKENHERE>
```

4. Start the bot

```sh
yarn start
```

## Built With

- [Discord.js](https://discord.js.org/)

## License

Distributed under the MIT License. See `LICENSE` for more information.


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FGHOSCHT%2Fpolly.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FGHOSCHT%2Fpolly?ref=badge_large)