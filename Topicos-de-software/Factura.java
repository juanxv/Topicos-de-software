import java.util.*;
public class Factura{
    //atributos de la clase
    private int nroFac;
    private Date fechaF;
    private Cliente cliente;
    private int totalF;
    private boolean estado;
    private ArrayList<Item> item;

    public String its;

    //Constructor para facturas
    public Factura(int nroFac, Cliente cliente, boolean estado){
        this.nroFac = nroFac;
        this.cliente = cliente;
        this.estado = estado;
        this.totalF = 0;
        this.fechaF = new Date();
        this.item = new ArrayList<>();
    }

    //para cambiar el estado de no pagado a pagado
    public void setEstado(){
        if(this.estado == true){
            this.estado = false;
        }else{
            this.estado = true;
        }
    }

    //Getters de la clase
    public int getTotal(){
        return totalF;
    }

    public boolean getEstado(){
        return this.estado;
    }

    public int getNro(){
        return this.nroFac;
    }

    public Date getFecha(){
        return this.fechaF;
    }

    public Cliente getCliente(){
        return this.cliente;
    }

    //Para ver los items a pagar
    public void verItems(){
        for(int i = 0; i < item.size(); ++i){
            its = " Objeto: " +  item.get(i).getDescripcion() + " Precio: " + item.get(i).getValor() + " Identificacion: " + item.get(i).getId() + "\n";
            //System.out.println(item.get(i).getDescripcion());
        }
    }

    //Añadir items
    public void addItems(Item it){
        item.add(it);
        SumaTotal(it.getValor());
    }

    //Valor total a pagar
    public void SumaTotal(int valor){
        this.totalF = totalF + valor;
    }

    //Eliminar items
    public void eliminarItems(int idI){
        for(int i = 0; i < item.size();++i){
            if(item.get(i).getId() == idI){
                SumaTotal((item.get(i).getValor()*-1));
                item.remove(i);
            }
        }
    }

    public String VerFactura(){
        verItems();
        return " Numero factura: " + this.nroFac + " fecha: " + this.fechaF + " cliente: " + this.cliente.toString() + " total: " + this.totalF + " estado factura: " + this.estado + "\n" + " Productos " +  its  ;
    }
}