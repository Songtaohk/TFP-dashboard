import { describe, expect, it } from "vitest";
import { dashboardData, economyData, pairGroups, years, type EconomyKey, type PairKey } from "../data/tfpDashboard";

describe("TFP dashboard data", () => {
  it("keeps every series aligned to the year range", () => {
    expect(years).toHaveLength(28);
    expect(years[0]).toBe("1999");
    expect(years.at(-1)).toBe("2026");

    const pairs = Object.values(pairGroups).flat() as PairKey[];

    for (const pair of pairs) {
      expect(dashboardData.fx[pair]).toHaveLength(years.length);
      expect(dashboardData.tfp.rtfpna[pair]).toHaveLength(years.length);
      expect(dashboardData.tfp.ctfp[pair]).toHaveLength(years.length);
      expect(dashboardData.nomSpread[pair]).toHaveLength(years.length);
      expect(dashboardData.realSpread[pair]).toHaveLength(years.length);
    }

    const economies = Object.keys(economyData) as EconomyKey[];
    for (const economy of economies) {
      expect(economyData[economy].rtfpna).toHaveLength(years.length);
      expect(economyData[economy].ctfp).toHaveLength(years.length);
      expect(economyData[economy].cpi).toHaveLength(years.length);
      expect(economyData[economy].nominal10y).toHaveLength(years.length);
      expect(economyData[economy].realRate).toHaveLength(years.length);
    }
  });

  it("includes Taiwan spread coverage from official CPI and TPEx yield data", () => {
    expect(dashboardData.nomSpread.usdtwd.some((value) => value !== null)).toBe(true);
    expect(dashboardData.realSpread.usdtwd.some((value) => value !== null)).toBe(true);
    expect(dashboardData.nomSpread.jpytwd.some((value) => value !== null)).toBe(true);
    expect(dashboardData.realSpread.cnytwd.some((value) => value !== null)).toBe(true);
    expect(dashboardData.fx.twdkrw.some((value) => value !== null)).toBe(true);
    expect(dashboardData.realSpread.twdkrw.some((value) => value !== null)).toBe(true);
  });

  it("keeps EUR cross-pair TFP comparisons visible", () => {
    expect(dashboardData.tfp.rtfpna.eurjpy.some((value) => value !== null)).toBe(true);
    expect(dashboardData.tfp.rtfpna.eurtwd.some((value) => value !== null)).toBe(true);
    expect(dashboardData.tfp.rtfpna.eurkrw.some((value) => value !== null)).toBe(true);
    expect(dashboardData.tfp.rtfpna.eurinr.some((value) => value !== null)).toBe(true);
    expect(dashboardData.tfp.ctfp.eurjpy.some((value) => value !== null)).toBe(true);
    expect(dashboardData.tfp.rtfpna.eurcny.slice(-4).every((value) => value !== null)).toBe(true);
    expect(dashboardData.tfp.ctfp.eurcny.slice(-4).every((value) => value !== null)).toBe(true);
    expect(new Set(dashboardData.tfp.rtfpna.eurcny.slice(-4)).size).toBeGreaterThan(1);
    expect(new Set(dashboardData.tfp.ctfp.eurcny.slice(-4)).size).toBeGreaterThan(1);
  });

  it("includes the added INR cross pairs", () => {
    for (const pair of ["cnyinr", "jpyinr", "twdinr"] as PairKey[]) {
      expect(dashboardData.fx[pair].some((value) => value !== null)).toBe(true);
      expect(dashboardData.tfp.rtfpna[pair].some((value) => value !== null)).toBe(true);
      expect(dashboardData.nomSpread[pair].some((value) => value !== null)).toBe(true);
    }
  });

  it("keeps rtfpna and ctfp as distinct TFP measures", () => {
    expect(dashboardData.tfp.rtfpna.usdcny).not.toEqual(dashboardData.tfp.ctfp.usdcny);
  });
});
