import { fetchCharacters, fetchCharacter } from "../src/api/rickAndMorty";

describe("rickAndMorty api", () => {
  beforeEach(() => {
    (globalThis as any).fetch = jest.fn();
  });

  it("fetchCharacters monta URL com page e name", async () => {
    (globalThis as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ info: { next: null }, results: [] }),
    });
    await fetchCharacters(2, "rick");
    expect((globalThis as any).fetch).toHaveBeenCalledWith(
      expect.stringContaining("/character?page=2&name=rick")
    );
  });

  it("fetchCharacter busca por id", async () => {
    (globalThis as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1 }),
    });
    await fetchCharacter(1);
    expect((globalThis as any).fetch).toHaveBeenCalledWith(
      expect.stringContaining("/character/1")
    );
  });
});
