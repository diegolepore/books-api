import { Book, BookStore } from '../../models/book'

const store = new BookStore()

describe("Book Model", () => {

  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('create method should add a book', async () => {
    // @ts-ignore
    const result = await store.create({
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
      summary: 'Some example summary here'
    });
    expect(result).toEqual({
      // @ts-ignore
      id: 1,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
      summary: 'Some example summary here'
    });
  });

  it('index method should return a list of books', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      // @ts-ignore
      id: 1,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
      summary: 'Some example summary here'
    }]);
  });

  it('show method should return the correct book', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      // @ts-ignore
      id: 1,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
      summary: 'Some example summary here'
    });
  });

  it('delete method should remove the book', async () => {
    store.delete('1');
    const result = await store.index()

    expect(result).toEqual([]);
  });
})