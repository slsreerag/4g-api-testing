import logo from "./logo.svg";
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import ApiReport from "./Components/ApiReport";
import ManualControlTesting from "./Components/32IO/ManualControlTesting";
import DoserReport from "./Components/Doser/DoserReport";
import ListPlant from "./Components/Doser/PlantComponent/ListPlant";
import CreatePlant from "./Components/Doser/PlantComponent/CreatePlant";
import ListGrowth from "./Components/Doser/GrowthComponent/ListGrowth";
import CreateGrowth from "./Components/Doser/GrowthComponent/CreateGrowth";
import EditGrowth from "./Components/Doser/GrowthComponent/EditGrowth";
import LoginComponent from "./Components/LoginComponent";
import Logout from "./Components/Logout";
import ListMacro from "./Components/Doser/MacroComponent/ListMacro";
import CreateMacro from "./Components/Doser/MacroComponent/CreateMacro";
import ListSystemSetting from "./Components/Doser/SettingComponent/ListSystemSetting";
import CreateSystemSetting from "./Components/Doser/SettingComponent/CreateSystemSetting";
import EditPlant from "./Components/Doser/PlantComponent/EditPlant";
import EditMacro from "./Components/Doser/MacroComponent/EditMacro";
import EditSystemSetting from "./Components/Doser/SettingComponent/EditSystemSetting";
import ClimateReport from "./Components/Doser/ClimateReport";
import Alert from "./Components/Doser/Alerts";
import FlowAlert from "./Components/Doser/FlowAlert";
import FloodingReport from "./Components/Doser/FloodingReport";
import DrainingReport from "./Components/Doser/DrainingReport";
import SyncStatusReport from "./Components/Doser/SyncStatusReport";
import ListDosingSetting from "./Components/Doser/DosingSettingComponent/ListDosingSetting";
import CreateDosingSetting from "./Components/Doser/DosingSettingComponent/CreateDosingSetting";
import EditDosingSetting from "./Components/Doser/DosingSettingComponent/EditDosingSetting";
import RelayControls from "./Components/32IO/RelayControls";
import ReportHistory from "./Components/32IO/ReportHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" exact element={<LoginComponent />} />
      <Route path="/logout" exact element={<Logout />} />
      <Route path="/home" element={<PrivateRoute><DoserReport/></PrivateRoute>}/>
      {/* plant details */}
      <Route path="/plants" element={<PrivateRoute><ListPlant/></PrivateRoute>}/>
      <Route path="/create/plant" element={<PrivateRoute><CreatePlant/></PrivateRoute>}/>
       <Route path="/edit/plant/:id" exact element={<PrivateRoute><EditPlant/></PrivateRoute>  } />

       {/* growth stage details */}
      <Route path="/growth_stage" element={<PrivateRoute><ListGrowth/></PrivateRoute>}/>
      <Route path="/create/growth_stage" element={<PrivateRoute><CreateGrowth/></PrivateRoute>}/>
      <Route path="/edit/growth_stage/:id" exact element={<PrivateRoute><EditGrowth/></PrivateRoute>  } />

       {/* macro details */}
      <Route path="/macro" element={<PrivateRoute><ListMacro/></PrivateRoute>}/>
      <Route path="/create/macro" element={<PrivateRoute><CreateMacro/></PrivateRoute>}/>
      <Route path="/edit/macro/:id" exact element={<PrivateRoute><EditMacro/></PrivateRoute>  } />

       {/* system setting */}
      <Route path="/system_setting" element={<PrivateRoute><ListSystemSetting/></PrivateRoute>}/>
      <Route path="/create/system_setting" element={<PrivateRoute><CreateSystemSetting/></PrivateRoute>}/>
      <Route path="/edit/system_setting/:id" exact element={<PrivateRoute><EditSystemSetting/></PrivateRoute>  } />

        {/* dosing setting */}
      <Route path="/dosing_setting" element={<PrivateRoute><ListDosingSetting/></PrivateRoute>}/>
      <Route path="/create/dosing_setting" element={<PrivateRoute><CreateDosingSetting/></PrivateRoute>}/>
      <Route path="/edit/dosing_setting/:id" exact element={<PrivateRoute><EditDosingSetting/></PrivateRoute>  } />

      <Route path="/32io_test" element={<PrivateRoute><ManualControlTesting/></PrivateRoute>}/>
      <Route path="/relay_controls" element={<PrivateRoute><RelayControls/></PrivateRoute>}/>
      <Route path="/history" element={<PrivateRoute><ReportHistory/></PrivateRoute>}/>
      <Route path="/4g_test" element={<PrivateRoute><ApiReport/></PrivateRoute>}/>

      <Route path="/climate" element={<PrivateRoute><ClimateReport/></PrivateRoute>}/>
      <Route path="/alerts" element={<PrivateRoute><Alert/></PrivateRoute>}/>
      <Route path="/flow_alerts" element={<PrivateRoute><FlowAlert/></PrivateRoute>}/>

      <Route path="/flooding_reports" element={<PrivateRoute><FloodingReport/></PrivateRoute>}/>
      <Route path="/draining_reports" element={<PrivateRoute><DrainingReport/></PrivateRoute>}/>
      <Route path="/syncing_status_report" element={<PrivateRoute><SyncStatusReport/></PrivateRoute>}/>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
