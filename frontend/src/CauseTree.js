import React, { useState, useEffect } from 'react'
import { Tree } from 'react-d3-tree';
import { Button, Container, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';

const circleNode = {
    "shape": "circle",
    "shapeProps": {
        "r": 12,
        "fill": "rgb(82, 226, 197)"
    }
}
export default function CauseTree() {

    const [tree, setTree] = useState({
        name: 'Kök Neden',
        children: []
    })

    const [selectedNode, setSelectedNode] = useState(undefined)
    const [inputName, setInputName] = useState('')
    const [buttonCommand, setButtonCommand] = useState({ execute: undefined })
    const [nodeClickCommand, setNodeClickCommand] = useState({ execute: undefined })
    const [selectedButton, setSelectedButton] = useState({ addB: false, updateB: false, deleteB: false, infoB: false })


    const infoInputNameError = () => {
        toast.error("Lütfen bir neden giriniz!")
    }
    const infoSelectNodeError = () => {
        toast.error("Lütfen bir kök seçiniz!")
    }

    const isValidate = (inputName, selectedNode) => {
        if (!inputName || inputName == "") {
            infoInputNameError()
            return false
        }
        if (!selectedNode) {
            infoSelectNodeError()
            return false
        }
        return true
    }

    const add = (inputName, tree, selectedNode) => {
        if (!isValidate(inputName, selectedNode)) return
        var tempTree = { ...tree }
        let node = getNode(tempTree, selectedNode)
        if (!node) {
            toast.success("Seçtiğiniz kök bulunamadı")
            return
        }
        node.children.push({ "name": inputName, "children": [] })
        setInputName('')
        setTree({ ...tempTree })
        toast.success("Kök neden eklendi.")
    }

    const update = (inputName, tree, selectedNode) => {
        if (!isValidate(inputName, selectedNode)) return
        var tempTree = { ...tree }
        let node = getNode(tempTree, selectedNode)
        if (!node) {
            toast.success("Seçtiğiniz kök bulunamadı")
            return
        }
        node.name = inputName
        setInputName('')
        toast.success("Seçtiğiniz kök değiştirildi")
        setSelectedNode(undefined)
        setTree({ ...tempTree })
    }

    const getNode = (tempTree, selectedNode) => {
        var que = []
        que.push(tempTree)
        while (que.length != 0) {
            var r = que.shift()
            if (r.name == selectedNode.name)
                return r;
            r.children.forEach(r => que.push(r))
        }
    }

    const deleteNode = (tree, selectedNode) => {
        if (tree.name == selectedNode.name) {
            toast.error("İlk kök kaldırılamaz!")
            return
        }
        var tempTree = { ...tree }
        var que = []
        que.push(tempTree)
        while (que.length != 0) {
            var r = que.shift()
            r.children = r.children.filter(e => e.name != selectedNode.name)
            r.children.forEach(r => que.push(r))
        }
        toast.success("Seçtiğiniz kök kaldırıldı.")
        setSelectedNode(undefined)
        setTree({ ...tempTree })
    }


    const changeButtonCommand = (op) => {
        setButtonCommand({ execute: op })
    }

    const op = () => {
        if (buttonCommand.execute) buttonCommand.execute(inputName, tree, selectedNode)
    }

    const changeInputName = (e) => {
        setInputName(e.target.value)
    }
    const selectNode = (tree, e) => {
        setSelectedNode(e)
    }

    useEffect(() => {
        changeNodeClickCommand(selectNode)
    }, [])

    const changeNodeClickCommand = (operation) => {
        setNodeClickCommand({ execute: operation })
    }

    const executeNodeClickCommand = (tree, e) => {
        if (nodeClickCommand.execute) nodeClickCommand.execute(tree, e)
    }
    const selectAddButton = () => {
        changeNodeClickCommand(selectNode)
        setSelectedButton({ addB: true });
        changeButtonCommand(add)
    }
    const selectUpdateButton = () => {
        changeNodeClickCommand(selectNode)
        setSelectedButton({ updateB: true });
        changeButtonCommand(update)
    }
    const selectDeleteButton = () => {
        setSelectedButton({ deleteB: true });
        changeNodeClickCommand(deleteNode)
    }

    return (
        <Container className="mt-5">
            <ToastContainer />
            <div className={"d-flex justify-content-center"}>
                {
                    <span className="mt-2"><b>İşlem Seçiniz:</b>
                        <Button color="primary" className="ml-1" onClick={() => { selectAddButton() }} color={selectedButton.addB ? "primary" : "muted"}>Ekle</Button>
                        <Button color="primary" className="ml-1" onClick={() => { selectUpdateButton() }} color={selectedButton.updateB ? "primary" : "muted"}>Düzenle</Button>
                        <Button color="primary" className="ml-1" onClick={() => { selectDeleteButton() }} color={selectedButton.deleteB ? "primary" : "muted"}>Kaldır</Button>
                    </span>}
            </div>
            { (selectedButton.addB || selectedButton.updateB) && <InputGroup className="mt-2">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText className="border-0" >Neden: </InputGroupText>
                </InputGroupAddon>
                <Input value={inputName} onChange={changeInputName} />
                <Button onClick={() => { op() }} color="primary">{selectedButton.addB ? "Ekle" : "Düzenle"}</Button>
            </InputGroup>}
            <div
                className="d-flex justify-content-center"
                style={{
                    height: '80vh',
                }}  >
                <Tree
                    nodeSvgShape={circleNode}
                    orientation="vertical"
                    translate={{ x: window.innerWidth / 3, y: window.innerHeight / 10 }}
                    data={tree}
                    separation={{ siblings: 2, nonSiblings: 2 }}
                    onClick={(e) => { executeNodeClickCommand(tree, e) }}
                />
            </div>
        </Container>
    )
}
