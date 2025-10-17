export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
};

export type PagedResult<T> = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
};

const BASE_URL = "https://rickandmortyapi.com/api";

export async function fetchCharacters(
  page = 1,
  query?: string
): Promise<PagedResult<Character>> {
  const url = new URL(`${BASE_URL}/character`);
  url.searchParams.set("page", String(page));
  if (query) url.searchParams.set("name", query);
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Erro ao buscar personagens: ${res.status}`);
  }
  return res.json();
}

export async function fetchCharacter(id: number): Promise<Character> {
  const res = await fetch(`${BASE_URL}/character/${id}`);
  if (!res.ok) throw new Error(`Erro ao buscar personagem ${id}`);
  return res.json();
}
