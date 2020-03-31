public class TipoItem{

    private int idTipo;
    private String descripcion;

    public TipoItem(int idTipo, String descripcion){
        this.idTipo = idTipo;
        this.descripcion = descripcion;
    }

    public TipoItem getTipo(){
        return new TipoItem(this.idTipo, this.descripcion);
    }
}