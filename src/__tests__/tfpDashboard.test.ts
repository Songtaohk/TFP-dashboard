import { describe, expect, it } from "vitest";
import { dashboardData, pairGroups, years, type PairKey } from "../data/tfpDashboard";

describe("TFP dashboard data", () => {
  it("keeps every series aligned to the year range", () => {
    expect(years).toHaveLength(28);
    expect(years[0]).toBe("1999");
    expect(years.at(-1)).toBe("2026");

    const pairs = Object.values(pairGroups).flat() as PairKey[];

    for (const pair of pairs) {
      expect(dashboardData.fx[pair]).toHaveLength(years.length);
      expect(dashboardData.tfp[pair]).toHaveLength(years.length);
      expect(dashboardData.nomSpread[pair]).toHaveLength(years.length);
      expect(dashboardData.realSpread[pair]).toHaveLength(years.length);
    }
  });
});
