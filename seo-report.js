const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign,
  HeadingLevel, LevelFormat, ExternalHyperlink, PageNumber, Header, Footer
} = require('docx');
const fs = require('fs');

const gold = "B8960C";
const dark = "1A1A1A";
const lightGray = "F5F5F5";
const midGray = "E0E0E0";
const white = "FFFFFF";

const border = { style: BorderStyle.SINGLE, size: 1, color: midGray };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: white };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function spacer(pts = 120) {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: pts, after: pts } });
}

function sectionHeading(text) {
  return new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, color: gold, font: "Arial" })],
    spacing: { before: 400, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: gold, space: 4 } }
  });
}

function bodyText(text, options = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, font: "Arial", color: dark, ...options })],
    spacing: { before: 60, after: 60 },
  });
}

function checkRow(item, status, note) {
  return new TableRow({
    children: [
      new TableCell({
        borders,
        width: { size: 3800, type: WidthType.DXA },
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        children: [new Paragraph({ children: [new TextRun({ text: item, size: 20, font: "Arial", bold: true, color: dark })] })]
      }),
      new TableCell({
        borders,
        width: { size: 1200, type: WidthType.DXA },
        shading: { fill: "E8F5E9", type: ShadingType.CLEAR },
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: status, size: 20, font: "Arial", bold: true, color: "2E7D32" })] })]
      }),
      new TableCell({
        borders,
        width: { size: 4360, type: WidthType.DXA },
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        children: [new Paragraph({ children: [new TextRun({ text: note, size: 20, font: "Arial", color: "444444" })] })]
      }),
    ]
  });
}

function detailRow(label, value, shaded = false) {
  return new TableRow({
    children: [
      new TableCell({
        borders,
        width: { size: 3000, type: WidthType.DXA },
        shading: shaded ? { fill: lightGray, type: ShadingType.CLEAR } : undefined,
        margins: { top: 80, bottom: 80, left: 140, right: 140 },
        children: [new Paragraph({ children: [new TextRun({ text: label, size: 20, font: "Arial", bold: true, color: dark })] })]
      }),
      new TableCell({
        borders,
        width: { size: 6360, type: WidthType.DXA },
        shading: shaded ? { fill: lightGray, type: ShadingType.CLEAR } : undefined,
        margins: { top: 80, bottom: 80, left: 140, right: 140 },
        children: [new Paragraph({ children: [new TextRun({ text: value, size: 20, font: "Arial", color: dark })] })]
      }),
    ]
  });
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22, color: dark } } }
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "KhunCamp.com  |  Advanced SEO Implementation Report", size: 18, font: "Arial", color: "888888" }),
              new TextRun({ text: "\tJune 2026", size: 18, font: "Arial", color: "888888" }),
            ],
            tabStops: [{ type: "right", position: 9360 }],
            border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: midGray, space: 4 } }
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "Prepared by Khun Camp  |  Confidential", size: 16, font: "Arial", color: "AAAAAA" }),
              new TextRun({ text: "\tPage ", size: 16, font: "Arial", color: "AAAAAA" }),
              new TextRun({ children: [PageNumber.CURRENT], size: 16, font: "Arial", color: "AAAAAA" }),
            ],
            tabStops: [{ type: "right", position: 9360 }],
            border: { top: { style: BorderStyle.SINGLE, size: 2, color: midGray, space: 4 } }
          })
        ]
      })
    },
    children: [

      // ─── COVER BLOCK ───────────────────────────────────────────────────────
      spacer(600),
      new Paragraph({
        children: [new TextRun({ text: "KHUNCAMP.COM", size: 52, bold: true, font: "Arial", color: gold })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "Advanced SEO Implementation Report", size: 32, font: "Arial", color: dark })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "June 2026", size: 22, font: "Arial", color: "888888" })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 600 }
      }),

      // ─── EXECUTIVE SUMMARY ─────────────────────────────────────────────────
      sectionHeading("Executive Summary"),
      bodyText("This report details the advanced SEO improvements implemented on khuncamp.com in June 2026. The work addressed six critical gaps identified in a technical SEO audit: an incomplete sitemap, missing structured data on blog posts, no Organisation schema on the homepage, inconsistent social meta tags, zero internal linking between blog posts, and a transparent favicon being served to Google Search."),
      spacer(80),
      bodyText("All six items have been resolved, committed to the repository, and deployed. The sitemap has been submitted to Google Search Console and ownership verification is complete."),

      // ─── SCOPE OF WORK ─────────────────────────────────────────────────────
      sectionHeading("Scope of Work"),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3800, 1200, 4360],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders,
                width: { size: 3800, type: WidthType.DXA },
                shading: { fill: dark, type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 140, right: 140 },
                children: [new Paragraph({ children: [new TextRun({ text: "Item", size: 20, bold: true, font: "Arial", color: white })] })]
              }),
              new TableCell({
                borders,
                width: { size: 1200, type: WidthType.DXA },
                shading: { fill: dark, type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 140, right: 140 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Status", size: 20, bold: true, font: "Arial", color: white })] })]
              }),
              new TableCell({
                borders,
                width: { size: 4360, type: WidthType.DXA },
                shading: { fill: dark, type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 140, right: 140 },
                children: [new Paragraph({ children: [new TextRun({ text: "Impact", size: 20, bold: true, font: "Arial", color: white })] })]
              }),
            ]
          }),
          checkRow("Sitemap Expansion", "✓ Done", "Google can now discover all 10 URLs (was 1)"),
          checkRow("Article + Breadcrumb Schema", "✓ Done", "Blog posts eligible for rich results in SERPs"),
          checkRow("Organisation Schema", "✓ Done", "Signals brand identity for Google Knowledge Panel"),
          checkRow("Twitter / OG Tag Consistency", "✓ Done", "Unified title and description across all social previews"),
          checkRow("Internal Linking", "✓ Done", "Cross-links and Read Next blocks on all blog posts"),
          checkRow("Favicon Fix", "✓ Done", "Solid-background logo replaces transparent badge"),
        ]
      }),

      // ─── DETAILED CHANGES ──────────────────────────────────────────────────
      sectionHeading("Detailed Changes"),

      // 1. Sitemap
      new Paragraph({
        children: [new TextRun({ text: "1. Sitemap Expansion", bold: true, size: 24, font: "Arial", color: dark })],
        spacing: { before: 240, after: 100 }
      }),
      bodyText("The sitemap.xml previously contained only the homepage URL. It has been rebuilt to include all 10 indexable pages with correct priorities, change frequencies, and last-modified dates."),
      spacer(60),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          detailRow("Pages added", "blog, program, events, privacy-policy, terms-of-service", true),
          detailRow("Blog posts added", "4 posts with clean URLs (no .html extension)", false),
          detailRow("Priority assignments", "Homepage 1.0 — Program 0.9 — Blog 0.8 — Posts 0.7 — Legal 0.2", true),
          detailRow("Submitted to", "Google Search Console (confirmed Success status)", false),
        ]
      }),

      spacer(120),

      // 2. Schema
      new Paragraph({
        children: [new TextRun({ text: "2. Article + BreadcrumbList Schema (Blog Posts)", bold: true, size: 24, font: "Arial", color: dark })],
        spacing: { before: 240, after: 100 }
      }),
      bodyText("All four blog posts were missing structured data entirely. Two JSON-LD schema blocks have been added to each post."),
      spacer(60),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          detailRow("Article schema includes", "headline, description, datePublished, dateModified, author, publisher, mainEntityOfPage", true),
          detailRow("BreadcrumbList schema", "3-level: Home → Blog → Post Title", false),
          detailRow("Posts updated", "8k-to-22k, stop-hiring-social-media-manager, the-funnel-gap, why-youtube-plateaus", true),
          detailRow("Benefit", "Enables rich results (breadcrumb trail) and article dating in SERPs", false),
        ]
      }),

      spacer(120),

      // 3. Organisation Schema
      new Paragraph({
        children: [new TextRun({ text: "3. Organisation Schema (Homepage)", bold: true, size: 24, font: "Arial", color: dark })],
        spacing: { before: 240, after: 100 }
      }),
      bodyText("The homepage previously used only a Service schema. An Organisation schema block has been added to establish brand identity signals with Google."),
      spacer(60),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          detailRow("Fields set", "name, url, logo, image, description, foundingDate, contactPoint", true),
          detailRow("sameAs array", "Empty — ready to populate with social profile URLs when accounts go live", false),
          detailRow("Benefit", "Feeds Google’s Knowledge Panel; reinforces brand as an entity, not just a page", true),
        ]
      }),

      spacer(120),

      // 4. Twitter/OG fix
      new Paragraph({
        children: [new TextRun({ text: "4. Twitter Card / OG Tag Consistency", bold: true, size: 24, font: "Arial", color: dark })],
        spacing: { before: 240, after: 100 }
      }),
      bodyText("The homepage Twitter Card title (\"Still Stuck Under 50K?\") and description did not match the Open Graph tags. This creates split signals. Both have been unified to match the primary OG tags."),

      spacer(120),

      // 5. Internal Linking
      new Paragraph({
        children: [new TextRun({ text: "5. Internal Linking", bold: true, size: 24, font: "Arial", color: dark })],
        spacing: { before: 240, after: 100 }
      }),
      bodyText("Blog posts had no cross-links whatsoever. Each post was an isolated island with no link equity flow. Contextual inline links and Read Next blocks have been added across all four posts."),
      spacer(60),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          detailRow("8k-to-22k links to", "why-youtube-plateaus (inline), stop-hiring-social-media-manager (inline), Read Next block", true),
          detailRow("why-youtube-plateaus links to", "8k-to-22k (inline + Read Next), program page (CTA)", false),
          detailRow("stop-hiring links to", "the-funnel-gap (inline + Read Next)", true),
          detailRow("the-funnel-gap links to", "stop-hiring (inline + Read Next)", false),
          detailRow("Benefit", "Distributes authority between posts, increases pages-per-session, strengthens topical clusters", true),
        ]
      }),

      spacer(120),

      // 6. Favicon
      new Paragraph({
        children: [new TextRun({ text: "6. Favicon Fix", bold: true, size: 24, font: "Arial", color: dark })],
        spacing: { before: 240, after: 100 }
      }),
      bodyText("Google Search was rendering the site favicon with a transparent background, which displayed as a white square or invisible icon next to search results. The favicon has been replaced sitewide with the solid-background version of the Khun Camp logo."),
      spacer(60),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          detailRow("Old favicon", "KhunCamp-Logo-badge-favicon-128.webp (transparent background)", true),
          detailRow("New favicon", "KhunCamp-Logo-favicon-solid.jpg (solid black background)", false),
          detailRow("Files updated", "All 12 HTML pages + manifest.json", true),
          detailRow("Note", "Google caches favicons aggressively. Expect 1–4 weeks for the new icon to appear in search results.", false),
        ]
      }),

      // ─── GOOGLE SEARCH CONSOLE ─────────────────────────────────────────────
      sectionHeading("Google Search Console"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          detailRow("Ownership verification", "Complete — verified via Cloudflare DNS record (Domain property)", true),
          detailRow("Property type", "Domain (covers all subdomains, http + https)", false),
          detailRow("Sitemap submitted", "https://khuncamp.com/sitemap.xml — Status: Success", true),
          detailRow("URLs in sitemap", "10 (was 1)", false),
          detailRow("Next action", "Monitor Discovered Pages count in Search Console over the next 3–7 days", true),
        ]
      }),

      // ─── WHAT TO EXPECT ────────────────────────────────────────────────────
      sectionHeading("What to Expect"),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Days 1–7: Google begins crawling the new sitemap URLs. Discovered Pages count in Search Console will increase.", size: 22, font: "Arial", color: dark })],
        spacing: { before: 60, after: 60 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Days 7–14: Blog posts indexed. Breadcrumb trails may begin appearing in search results for post pages.", size: 22, font: "Arial", color: dark })],
        spacing: { before: 60, after: 60 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Weeks 2–4: Favicon update visible in Google Search results (cache-dependent).", size: 22, font: "Arial", color: dark })],
        spacing: { before: 60, after: 60 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Weeks 4–8: Organisation schema begins contributing to brand entity signals. Knowledge Panel eligibility improves once Google sees consistent data across pages and external sources.", size: 22, font: "Arial", color: dark })],
        spacing: { before: 60, after: 60 }
      }),
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: "Ongoing: Internal links will compound as more blog content is published. Each new post should follow the same schema, favicon, and linking conventions established in this implementation.", size: 22, font: "Arial", color: dark })],
        spacing: { before: 60, after: 60 }
      }),

      // ─── REMAINING ITEMS ───────────────────────────────────────────────────
      sectionHeading("Remaining Recommendations"),
      bodyText("The following item was identified during the audit but requires additional assets before implementation:"),
      spacer(60),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          detailRow("Unique OG images per blog post", "Each post currently shares the same og-preview.jpg. Creating post-specific 1200×630px images will improve social sharing CTR and strengthen Article schema image signals. Recommend creating one per post in Canva or via AI image generation.", true),
          detailRow("sameAs social URLs", "Add YouTube, Instagram, and other profile URLs to the Organisation schema once accounts are active.", false),
        ]
      }),

      spacer(200),
      new Paragraph({
        children: [new TextRun({ text: "End of Report", size: 18, font: "Arial", color: "AAAAAA", italics: true })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 }
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("C:\\Users\\4kam3\\Desktop\\KhunCamp-SEO-Report-June2026.docx", buffer);
  console.log("Done: KhunCamp-SEO-Report-June2026.docx");
});
