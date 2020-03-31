public class Item{
    private TipoItem tipo;
    private int id;
    private String descripcion;
    private int valor;

    //Constructor clase Item
    public Item(TipoItem tipo, int id, String descripcion, int valor){
        this.tipo = tipo;
        this.id = id;
        this.descripcion = descripcion;
        this.valor = valor;
    }

    //Si necesito sumar precios, el valor del objeto
    public int getValor(){
        return this.valor;
    }

    //Si necesito diferenciar mi item
    public int getId(){
        return this.id;
    }

    public String getDescripcion(){
        return this.descripcion;
    }

    //Devolver todo el objeto
    public String toString(){
        return "Tipo item: " + this.tipo + " Id Item: " + this.id + " Descripcion: " + this.descripcion + " Precio: " + this.valor;
    }
}