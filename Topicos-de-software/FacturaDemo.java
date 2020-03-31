import java.util.*;
public class FacturaDemo{
    public static void main(String[] args) {
        Simulador();
    }

    //Simulo que tengo una base de datos
    public static void Simulador(){
        FacturaDaoImpl fac = new FacturaDaoImpl();
        Scanner entrada = new Scanner(System.in);
        int fit = 0;
        do{
            Menu();
            fit = entrada.nextInt();
            if(fit == 1){
                System.out.println("Nombre cliente: ");
                String nomb = entrada.next();
                System.out.println("Apellido cliente: ");
                String apel = entrada.next();
                System.out.println("cedula cliente: ");
                int id = entrada.nextInt();
                System.out.println("Genero cliente(1hombre 2mujer): ");
                int gen = entrada.nextInt();
                String genero;
                if(gen == 1){
                    genero = "hombre";
                }else{
                    genero = "mujer";
                }
                System.out.println("Estado civil: ");
                String estado = entrada.next();
                System.out.println("Fecha nacimiento (AAAA-MM-DD): ");
                int nac = entrada.nextInt();
                Cliente cliente = new Cliente(nomb, apel, id, genero, estado, nac);
                fac.CrearFactura(cliente, false);
            }else if(fit == 2){
                System.out.println("Ingresa el numero de factura: ");
                int nro = entrada.nextInt();
                System.out.println("1. Cambiar estado factura\n2. Añadir item\n3. Eliminar item");
                int accion = entrada.nextInt();
                fac.ActualizarFactura(accion, nro);
            }else if(fit == 3){
                System.out.println("Numero de la factura a eliminar: ");
                int num = entrada.nextInt();
                fac.EliminarFactura(num);
            }else if(fit == 4){
                fac.VerFacturas();
            }
        }while(fit != 5);
        entrada.close();
    }





    //Metodo menu
    public static void Menu(){
        System.out.println("1. Crear Factura");
        System.out.println("2. Actualizar Factura");
        System.out.println("3. Eliminar Factura");
        System.out.println("4. Ver Facturas");
        System.out.println("5. Para salir");
    }
}