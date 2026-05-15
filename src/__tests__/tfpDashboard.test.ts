import { describe, expect, it } from "vitest";
import { dashboardData, years, type RegionKey } from "../data/tfpDashboard";

const regions: RegionKey[] = ["uscn", "eucn", "euus"];

describe("TFP dashboard data", () => {
  it("keeps every series aligned to the year range", () => {
    expect(years).toHaveLength(28);
    expect(years[0]).toBe("1999");
    expect(years.at(-1)).toBe("2026");

    for (const region of regions) {
      expect(dashboardData.fx[region]).toHaveLength(years.length);
      expect(dashboardData.tfp[region]).toHaveLength(years.length);
      expect(dashboardData.nomSpread[region]).toHaveLength(years.length);
      expect(dashboardData.realSpread[region]).toHaveLength(years.length);
    }

    expect(dashboardData.euRealRate).toHaveLength(years.length);
  });
});
