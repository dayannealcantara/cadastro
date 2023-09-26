import { useParams, useNavigate } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {  FerramentasDeDetalhes } from '../../shared/components';



export const DetalheDePessoas: React.FC =() =>{ 
  const {id = 'nova'} =useParams<'id'>();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('Save');
  };
  const handleDelete = () => {
    console.log('Delete');
  };

  return(
    <LayoutBaseDePagina titulo='Detalhe de Pessoa' barraDeFerramentas={<FerramentasDeDetalhes  
      textoBtn='Nova' 
      btnNovo = {id !== 'nova'}
      btnApagar ={id !== 'nova'}
      btnSalvarFechar    

      aoClicarNovo={() => navigate('/pessoas/detalhe/nova')}
      aoClicarSalvar={handleSave}
      aoClicarVoltar={() => navigate('/pessoas')}
      aoClicarSalvarFechar={()=> {}}
      aoClicarApagar={handleDelete}
    />
    }>  
      <p>Detalhe de pessoa {id}</p>        
    </LayoutBaseDePagina> 
    
  );
};