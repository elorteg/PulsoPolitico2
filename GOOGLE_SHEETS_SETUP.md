# Google Sheets Integration Setup Guide

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Set up columns in Row 1:
   - A1: `Title`
   - B1: `Author` 
   - C1: `Source`
   - D1: `URL`
   - E1: `Time`
   - F1: `Category`
   - G1: `Paywall`

## Step 2: Get Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable the Google Sheets API
4. Create credentials (API Key)
5. Restrict the API key to Google Sheets API only

## Step 3: Make Sheet Public

1. In your Google Sheet, click "Share"
2. Change access to "Anyone with the link can view"
3. Copy the Sheet ID from the URL

## Step 4: Environment Variables

Add to your `.env.local` file:

\`\`\`
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SHEETS_API_KEY=your_api_key_here
\`\`\`

## Step 5: Add News Articles

Simply add rows to your Google Sheet:

| Title | Author | Source | URL | Time | Category | Paywall |
|-------|--------|--------|-----|------|----------|---------|
| Article Title | John Doe | El Mostrador | https://... | Hace 1 hora | Análisis | FALSE |
| Another Article | Jane Smith | La Tercera | https://... | Hace 2 horas | Economía | TRUE |

## Features

- ✅ **Real-time updates**: Changes appear within 5 minutes
- ✅ **No coding required**: Edit through familiar spreadsheet interface
- ✅ **Fallback data**: Site works even if Sheets is unavailable
- ✅ **Caching**: Optimized performance with 5-minute cache
- ✅ **Error handling**: Graceful degradation if API fails

## Usage

To add a new article:
1. Open your Google Sheet
2. Add a new row with article details
3. Save - changes will appear on site within 5 minutes

No deployment or code changes needed!
