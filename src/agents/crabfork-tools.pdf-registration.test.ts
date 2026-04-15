import { describe, expect, it } from "vitest";
import { collectPresentCrabforkTools } from "./crabfork-tools.registration.js";
import { createPdfTool } from "./tools/pdf-tool.js";

describe("createCrabforkTools PDF registration", () => {
  it("includes the pdf tool when the pdf factory returns a tool", () => {
    const pdfTool = createPdfTool({
      agentDir: "/tmp/crabfork-agent-main",
      config: {
        agents: {
          defaults: {
            pdfModel: { primary: "openai/gpt-5.4-mini" },
          },
        },
      },
    });

    expect(pdfTool?.name).toBe("pdf");
    expect(collectPresentCrabforkTools([pdfTool]).map((tool) => tool.name)).toContain("pdf");
  });
});
