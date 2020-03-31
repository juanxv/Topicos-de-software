public class Cliente{

    private String nombre;
    private String apellido;
    private int id;
    private String genero;
    private String eCivil;
    private int fNacimiento; 

    public Cliente(String nombre, String apellido, int id, String genero, String eCivil, int fNacimiento){
        this.nombre = nombre;
        this.apellido = apellido;
        this.id = id;
        this.genero = genero;
        this.eCivil = eCivil;
        this. fNacimiento = fNacimiento;
    }

    public void setCliente(String nombre, String apellido, int id, String genero, String eCivil, int fNacimiento){
        this.nombre = nombre;
        this.apellido = apellido;
        this.id = id;
        this.genero = genero;
        this.eCivil = eCivil;
        this.fNacimiento = fNacimiento;
    }

    public String toString(){
        return this.nombre + " " + this.apellido + " " + this.id + " " + this.genero + " " + this.eCivil + " " + this.fNacimiento ;
    }

}