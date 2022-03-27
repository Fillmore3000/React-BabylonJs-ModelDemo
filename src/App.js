import "./App.css";
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Engine, Scene } from 'react-babylonjs';
import { Vector3, Color3, ActionManager, SetValueAction } from '@babylonjs/core';
import Octicon, {ArrowRightIcon, ArrowLeftIcon} from '@primer/octicons-react';
import ScaledModelWithProgress from './ScaledModelWithProgress';

  

const App = props => {
  
  const [TeesSettings, updateTeesSettings] = useState({
    teesScaling: 3.0,
    modelRotationY: Math.PI
  })


  const moveTeesDown = () => {
    updateTeesSettings((state) => ({
      ...state, 
      modelRotationY: state.modelRotationY + 0.1
    }))
  }

  const moveTeesUp = () => {
    updateTeesSettings((state) => ({
      ...state,
      modelRotationY: state.modelRotationY - 0.1
    }))
  }

  

  
  let baseUrl = "./models/";

  return (
    <div>
      <div className="row">
        <div className="col-xs-3 col-lg-3 align-top"></div>
        <div className="col-xs-3 col-lg-3 align-top hover">
          <h1>ROTATE CLOTHES:</h1><br/>
          <Button onClick={moveTeesDown}><Octicon icon={ArrowLeftIcon}/></Button>
          &nbsp;&nbsp;
          <Button onClick={moveTeesUp}><Octicon icon={ArrowRightIcon}/></Button>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
            <Scene>
              <arcRotateCamera name="camera1" alpha={Math.PI / 2} beta={Math.PI / 2} radius={9.0} target={Vector3.Zero()} minZ={0.001} />
              <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
              
              <ScaledModelWithProgress rootUrl={`${baseUrl}glTF/`} sceneFilename="test-model.gltf" scaleTo={3} 
                progressBarColor={Color3.FromInts(255, 165, 0)} center={new Vector3(2.5, -1.5, 1)}
                modelRotation={new Vector3(0, TeesSettings.modelRotationY, 0)}
              />

              <ScaledModelWithProgress rootUrl={`${baseUrl}glTF/`} sceneFilename="tee-template.gltf" scaleTo={TeesSettings.teesScaling} 
                progressBarColor={Color3.FromInts(255, 165, 0)} center={new Vector3(-2.5, -1.5, 1)}
                modelRotation={new Vector3(0, TeesSettings.modelRotationY, 0)}
              />
            </Scene>
          </Engine>
        </div>
        <div className="col-xs-12 col-md-6">
        
              
        </div>
      </div>
    </div>
  )
}


export default App;
