

export declare interface Model {
  Create(item) ;
  Update(item) ;
  Delete(item) ;
  List() ;
  ListTrashed() ;
  GetItemtID(idItem);
  GetItemtTrashedID(idItemTrashed);
  Add(item);
  AddTrashed(itemTrashed);
  Remove(item);
  RemoveTrashed(itemTrashed);
}