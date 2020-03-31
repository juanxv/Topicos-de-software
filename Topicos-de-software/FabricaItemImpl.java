public class FabricaItemImpl implements FabricaItem{

    private Item crear;

    //Creacion de items
    @Override
    public void crearItem(TipoItem tipo, int id, String descripcion, int valor) {
        this.crear = new Item(tipo, id, descripcion, valor);
    }

    //Para saber si un item es distinto a otro
    public Item obItem(){
        return crear; 
    }
}