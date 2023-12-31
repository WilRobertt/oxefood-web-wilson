import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import {mensagemErro, notifyError, notifySuccess } from '../util/Util';


export default function FormProduto () {

    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8082/api/produto/" + state.id)
.then((response) => {
                           setIdProduto(response.data.id)
                           setTitulo(response.data.titulo)
                           setCodigoProduto(response.data.codigoProduto)
                           setValorUnitario(response.data.valorUnitario)
                           setDescricao(response.data.descricao)
                           setTempoMaximoEntrega(response.data.tempoMaximoEntrega)
                           setTempoMinimoEntrega(response.data.tempoMinimoEntrega)
            })
        }
}, [state])

    const [titulo, setTitulo] = useState();
    const [codigoProduto, setCodigoProduto] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [descricao, setDescricao] = useState();
    const [tempoMaximoEntrega, setTempoMaximoEntrega] = useState();
    const [tempoMinimoEntrega, setTempoMinimoEntrega] = useState();

    function salvar() {

		let produtoRequest = {
		     titulo: titulo,
		     codigoProduto:codigoProduto,
		     valorUnitario:valorUnitario,
		     descricao:descricao,
             tempoMaximoEntrega:tempoMaximoEntrega,
             tempoMinimoEntrega:tempoMinimoEntrega,
		}
	
        if (idProduto != null) { //Alteração:
            axios.put("http://localhost:8082/api/produto/" + idProduto, produtoRequest)
            .then((response) => {notifySuccess('Produto alterado com sucesso.')})
            .catch((error) => {if (error.response) {
                notifyError(error.response.data.errors[0].defaultMessage)
            } else {
                notifyError(mensagemErro)} })
                                
        } else { //Cadastro:
            axios.post("http://localhost:8082/api/produto", produtoRequest)
            .then((response) => {notifySuccess('Produto cadastrado com sucesso.')})
            .catch((error) => {if (error.response) {
                notifyError(error.response.data.errors[0].defaultMessage)
            } else {
                notifyError(mensagemErro)} })
                                
        } 
 
	}

    return (

        <div>
            <MenuSistema />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                { idProduto === undefined &&
    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
}
{ idProduto != undefined &&
    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
}
                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100"
                                    placeholder="Informe o título do produto"
                                    value={titulo}
			                        onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'
                                    placeholder="Informe o código do produto"
                                    maxLength="100"
                                    value={codigoProduto}
			                        onChange={e => setCodigoProduto(e.target.value)}>
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group widths='equal'>
                             
                                <Form.TextArea
                                    fluid
                                    label='Descrição'
                                    maxLength="300"
                                    placeholder="Informe a descrição do produto"
                                    value={descricao}
			                        onChange={e => setDescricao(e.target.value)}
                                    >
                                    
                                </Form.TextArea>
                                <div>
                                <Form.Input
                                    fluid
                                    label='Valor Unitário'
                                    maxLength="50"
                                    placeholder="30"
                                    value={valorUnitario}
			                        onChange={e => setValorUnitario(e.target.value)}
                                    > 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo em Minutos'
                                    placeholder="30"
                                    value={tempoMinimoEntrega}
			                        onChange={e => setTempoMinimoEntrega(e.target.value)}
                                >
                                   
                                </Form.Input>
                                
                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    placeholder="40"
                                    value={tempoMaximoEntrega}
			                        onChange={e => setTempoMaximoEntrega(e.target.value)}
                                >
                               
                                </Form.Input>
                                </div>
                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-produto'}>Voltar</Link>
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}

                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    );

}