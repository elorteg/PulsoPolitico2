# Complete Google Sheets Setup Guide 📊

## Overview
This guide will help you set up Google Sheets to manage all content on your political news site. No coding experience required!

## What You'll Manage
- ✅ **Recomendados** - Featured news articles (7 items)
- ✅ **MetaEncuesta** - Poll averages (5 candidates)  
- ✅ **Encuestas Recientes** - Recent polls (5 polls)
- ✅ **Más Análisis** - Analysis articles (3 items)

---

## Step 1: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "Create" → "Blank spreadsheet"
3. Name it: "Pulso Nacional - Content Management"

## Step 2: Create Sheet Tabs

Create 4 tabs at the bottom:
- Tab 1: "Recomendados"
- Tab 2: "MetaEncuesta" 
- Tab 3: "EncuestasRecientes"
- Tab 4: "MasAnalisis"

---

## Step 3: Set Up Each Tab

### Tab 1: Recomendados
**Row 1 (Headers):**
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Title | Author | Source | URL | Time | Category | Paywall |

**Example Row 2:**
| Los desafíos de Jara para romper su techo electoral | Francisca Castillo | El Mostrador | https://www.elmostrador.cl/... | Hace 1 hora | Análisis | FALSE |

**Categories:** Análisis, Campaña, Opinión, Encuestas, Economía, Seguridad
**Paywall:** TRUE or FALSE

### Tab 2: MetaEncuesta
**Row 1 (Headers):**
| A | B | C | D | E |
|---|---|---|---|---|
| Candidate | Party | Percentage | Change | Color |

**Example Row 2:**
| Gabriel Boric | Frente Amplio | 38.2 | 1.2 | red |

**Colors:** red, blue, purple, green, orange, gray
**Change:** Use positive/negative numbers (1.2 for +1.2%, -0.8 for -0.8%)

### Tab 3: EncuestasRecientes  
**Row 1 (Headers):**
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Pollster | Date | Boric | Kast | Matthei | Provoste | Parisi |

**Example Row 2:**
| Cadem | 13-15 Ene | 39 | 33 | 16 | 8 | 4 |

**Numbers:** Just the percentage number (39 for 39%)

### Tab 4: MasAnalisis
**Row 1 (Headers):**
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Title | Author | Source | Time | Category | Summary |

**Example Row 2:**
| La estrategia de Boric para mantener el liderazgo | Carlos Peña | El Mostrador | Hace 2 horas | Análisis | Un análisis sobre las tácticas... |

---

## Step 4: Get Google Sheets API Key

### 4.1 Go to Google Cloud Console
1. Visit [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project or select existing one
3. Name it: "Pulso Nacional Website"

### 4.2 Enable Google Sheets API
1. Go to "APIs & Services" → "Library"
2. Search "Google Sheets API"
3. Click "Enable"

### 4.3 Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key (looks like: AIzaSyC4E1Dq2HcmBSgxVDFTG...)
4. Click "Restrict Key"
5. Under "API restrictions" → Select "Google Sheets API"
6. Save

### 4.4 Make Sheet Public
1. In your Google Sheet, click "Share" (top right)
2. Change to "Anyone with the link can view"
3. Copy the Sheet ID from URL:
   `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

---

## Step 5: Add to Environment Variables

Add these to your Vercel environment variables:
\`\`\`
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SHEETS_API_KEY=your_api_key_here
\`\`\`

---

## Step 6: How to Update Content

### Adding New Recomendados Article:
1. Open your Google Sheet
2. Go to "Recomendados" tab
3. Add new row with article details
4. Save (Ctrl+S or Cmd+S)
5. Changes appear on website within 5 minutes!

### Updating Poll Numbers:
1. Go to "MetaEncuesta" tab
2. Update percentage numbers
3. Update change numbers (positive for gains, negative for losses)
4. Save

### Adding New Poll:
1. Go to "EncuestasRecientes" tab  
2. Add new row at top (insert row above row 2)
3. Fill in pollster, date, and all candidate numbers
4. Save

---

## Tips for Success

✅ **Always use Row 1 for headers** - Don't change these  
✅ **Keep URLs complete** - Include https://  
✅ **Use consistent time format** - "Hace X horas" or "Hace X días"  
✅ **Double-check numbers** - Polls should add up reasonably  
✅ **Test changes** - Wait 5 minutes and check website  
✅ **Keep backup** - Google Sheets auto-saves, but you can download copies  

## Troubleshooting

**Problem:** Changes not showing on website  
**Solution:** Wait 5 minutes, check Sheet ID and API key

**Problem:** Error messages  
**Solution:** Check that sheet is public and API key is correct

**Problem:** Missing articles  
**Solution:** Make sure Title column (A) is filled for each row

---

## Advanced: Team Management

You can share editing access:
1. Click "Share" in Google Sheets
2. Add team member emails
3. Give "Editor" permission
4. They can now update content too!

## Need Help?

- Check the fallback data in the code for examples
- Make sure your data format matches exactly
- Test with one small change first
- Contact support if API setup fails
