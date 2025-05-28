import { render, act } from "@testing-library/react";
import {
  CollectionsProvider,
  useCollectionsContext,
} from "../src/contexts/collectionsContext";

const TestComponent = ({ callback }) => {
  const context = useCollectionsContext();
  callback && callback(context);
  return null;
};

describe("CollectionsContext", () => {
  test("Collections starts as an array containing a single collection object", () => {
    let contextRef;
    render(
      <CollectionsProvider>
        <TestComponent
          callback={(context) => {
            contextRef = context;
          }}
        />
      </CollectionsProvider>
    );
    expect(Array.isArray(contextRef.collections)).toBe(true);
    expect(contextRef.collections.length).toBe(1);
  });

  test("Initial collection object is has name property of favourites, with no artworks", () => {
    let contextRef;
    render(
      <CollectionsProvider>
        <TestComponent
          callback={(context) => {
            contextRef = context;
          }}
        />
      </CollectionsProvider>
    );
    expect(typeof contextRef.collections[0]).toBe("object");
    expect(contextRef.collections).toEqual([
      { name: "Favourites", artworks: [] },
    ]);
    expect(contextRef.collections[0].artworks.length).toBe(0);
  });

  test("addCollection adds new collection with the name property matching the string passed as an argument", () => {
    let contextRef;
    render(
      <CollectionsProvider>
        <TestComponent
          callback={(context) => {
            contextRef = context;
          }}
        />
      </CollectionsProvider>
    );
    act(() => {
      contextRef.addCollection("Paintings");
      contextRef.addCollection("Sculptures");
    });
    expect(contextRef.collections).toEqual([
      { name: "Favourites", artworks: [] },
      { name: "Paintings", artworks: [] },
      { name: "Sculptures", artworks: [] },
    ]);
  });

  test("addArtworkToCollection adds artwork to the existing Favourites collection", () => {
    let contextRef;
    render(
      <CollectionsProvider>
        <TestComponent
          callback={(context) => {
            contextRef = context;
          }}
        />
      </CollectionsProvider>
    );
    act(() => {
      contextRef.addArtworkToCollection("Favourites", {
        id: 1,
        title: "Mona Lisa",
      });
    });
    expect(contextRef.collections).toEqual([
      { name: "Favourites", artworks: [{ id: 1, title: "Mona Lisa" }] },
    ]);
  });

  test("addArtworkToCollection adds artwork to the collection passed as an argument", () => {
    let contextRef;
    render(
      <CollectionsProvider>
        <TestComponent
          callback={(context) => {
            contextRef = context;
          }}
        />
      </CollectionsProvider>
    );
    act(() => {
      contextRef.addCollection("Paintings");
      contextRef.addArtworkToCollection("Paintings", {
        id: 1,
        title: "Mona Lisa",
      });
    });
    console.log(contextRef.collections[1]);
    expect(contextRef.collections).toEqual([
      { name: "Favourites", artworks: [] },
      { name: "Paintings", artworks: [{ id: 1, title: "Mona Lisa" }] },
    ]);
  });

  test("deleteCollection deletes the collection passed as an argument", () => {
    let contextRef;
    render(
      <CollectionsProvider>
        <TestComponent
          callback={(context) => {
            contextRef = context;
          }}
        />
      </CollectionsProvider>
    );
    act(() => {
      contextRef.addCollection("Paintings");
    });
    act(() => {
      contextRef.deleteCollection("Favourites");
    });
    expect(contextRef.collections).toEqual([
      { name: "Paintings", artworks: [] },
    ]);
  });
});
