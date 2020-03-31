import java.util.*;
public class Data{
    private ArrayList<Cliente> clientes = new ArrayList<>();

    public void GuardarCliente(Cliente cliente){
        clientes.add(cliente);
    }

    public void VerClientes(){
        for(int i = 0; i<clientes.size();++i){
            System.out.println(clientes.get(i).toString());
        }
    }
}