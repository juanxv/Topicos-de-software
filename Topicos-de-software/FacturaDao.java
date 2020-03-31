public interface FacturaDao{
    public void CrearFactura(Cliente cliente, boolean estado);
    public void ActualizarFactura(int accion, int nro);
    public void EliminarFactura(int nroF);
    public void VerFacturas();
}