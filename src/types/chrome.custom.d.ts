declare namespace chrome {
  export namespace readingList {
    interface EntryToAddOrUpdate {
      title: string;
      url: string;
      hasBeenRead?: boolean;
    }

    interface QueryOptions {
      url?: string;
      title?: string;
      hasBeenRead?: boolean;
    }

    interface Entry {
      id: string;
      title: string;
      url: string;
      creationTime: number;
      hasBeenRead: boolean;
    }

    export function addEntry(entry: EntryToAddOrUpdate): Promise<void>;
    export function removeEntry(options: { id: string }): Promise<void>;
    export function updateEntry(options: {
      id: string;
      hasBeenRead: boolean;
    }): Promise<void>;
    export function query(options?: QueryOptions): Promise<Entry[]>;

    interface ReadingListEvent {
      onEntryAdded: {
        addListener(callback: (entry: Entry) => void): void;
      };
      onEntryRemoved: {
        addListener(callback: (entry: { id: string }) => void): void;
      };
      onEntryUpdated: {
        addListener(callback: (entry: Entry) => void): void;
      };
    }
  }
}
