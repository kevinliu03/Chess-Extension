# Lichess Importer Chrome Extension

## Overview

The Lichess Importer is a Chrome extension that allows users to import chess games from Chess.com to Lichess.org seamlessly. This extension enhances the user experience by providing a button on Chess.com game pages that, when clicked, retrieves the PGN (Portable Game Notation) of the game and opens Lichess.org to import it.

## Features

- **Button Creation**: Automatically creates a button on Chess.com game pages to initiate the import process.
- **PGN Retrieval**: Retrieves the PGN of the current game from Chess.com.
- **Lichess Integration**: Opens Lichess.org and imports the retrieved PGN into the analysis board.
- **Storage**: Utilizes Chrome's storage API to temporarily store the PGN for easy access during the import process.

## Installation

1. Download or clone the repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click on "Load unpacked" and select the directory where the extension files are located.
5. The Lichess Importer extension should now be installed and visible in your extensions list.

## Usage

1. Navigate to a game on Chess.com (e.g., `https://www.chess.com/game/...`).
2. Once the game has fully loaded, a button labeled "Lichess Import" will appear.
3. Click the "Lichess Import" button to retrieve the PGN and open Lichess.org.
4. The PGN will be automatically imported into the Lichess analysis board.
