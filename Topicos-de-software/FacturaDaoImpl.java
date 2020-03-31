import java.util.*;

public class FacturaDaoImpl implements FacturaDao{

    private ArrayList<Factura> facs = new ArrayList<>();
    private int nroFac = 0;
    private int id = 0;

    @Override
    public void CrearFactura(Cliente cliente, boolean estado) {
        nroFac++;
        Factura fac = new Factura(nroFac, cliente, estado);
        facs.add(fac);
    }

    @Override
    public void ActualizarFactura(int accion,  int nro) {
        Scanner scan = new Scanner(System.in);
        int cont = 0;
        for(int i = 0; i<facs.size();++i){
            if(facs.get(i).getNro() == nro){
                cont = i;
                i = facs.size();
                        
            }
        }
        //Busco la factura a usar
        if(accion == 1){
            //Cambio su estado
            if(facs.get(cont).getEstado() == true){
                System.out.println("Estado: no pagado");
            }else{
                System.out.println("Estado: pagado");
            }
            facs.get(cont).setEstado();
        //Para agregar un item al carrito
        }else if(accion == 2){
            id++;
            System.out.println("Ingresa la descripcion del objeto (ejempo: electronico, zapatos, ropa, etc)");
            String desc = scan.next();
            System.out.println("Ingresa la id del objeto");
            int idi = scan.nextInt();
            TipoItem tipe = new TipoItem(id, desc);
            System.out.println("Nombre producto");
            String des2 = scan.next();
            System.out.println("Valor producto");
            int valor = scan.nextInt();
            Item it = new Item(tipe, idi, des2, valor);
            facs.get(cont).addItems(it);
            System.out.println("Producto agregado");
            //Eliminar items de la factura
        }else if(accion == 3){
            System.out.println("Id del producto");
            int idp = scan.nextInt();
            facs.get(cont).eliminarItems(idp);
        }   
        
          
    }
    //Eliminar una factura
    @Override
    public void EliminarFactura(int nroF) {
        int cont = 0;
        //Busco la factura a usar
        for(int i = 0; i<facs.size();++i){
            if(facs.get(i).getNro() == nroF){
                cont = i;
                i = facs.size();       
            }
        }

        facs.remove(cont);
    }

    @Override
    public void VerFacturas() {
        //Busco la factura a usar
        for(int i = 0; i<facs.size();++i){
            System.out.println(facs.get(i).VerFactura());
        }
    }

    
}