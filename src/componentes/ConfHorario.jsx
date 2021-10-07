import React from 'react'
import {Horas} from './Horas'

export function ConfHorario() {
    return (
        <div className="w3-container w3-panel w3-col m10 w3-center">
            <div className="w3-container w3-panel w3-white ">
                <h2>Ajuste de horario</h2>
                <div className="w3-row w3-border">
                    <form>
                        <div className="w3-col m2 w3-panel w3-left-align">
                            <h3><label className="w3-text-indigo"><b>Días.</b></label></h3>                  
                            <p>
                            <input className="w3-check" type="checkbox"/>
                            <label className="w3-text-indigo"><b>Lunes</b></label></p>
                            <p>
                            <input className="w3-check" type="checkbox"/>
                            <label className="w3-text-indigo"><b>Martes</b></label></p>
                            <p>
                            <input className="w3-check" type="checkbox"/>
                            <label className="w3-text-indigo"><b>Miércoles</b></label></p>
                            <p>
                            <input className="w3-check" type="checkbox"/>
                            <label className="w3-text-indigo"><b>Jueves</b></label></p>
                            <p>
                            <input className="w3-check" type="checkbox"/>
                            <label className="w3-text-indigo"><b>Viernes</b></label></p>
                            <p>
                            <input className="w3-check" type="checkbox"/>
                            <label className="w3-text-indigo"><b>Sábado</b></label></p>
                            <p>
                            <input className="w3-check" type="checkbox"/>
                            <label className="w3-text-indigo"><b>Domingo</b></label></p>
                        </div>
                        <div className="w3-col m2 w3-center w3-panel">
                            <label className="w3-text-indigo"><b>Hora de inicio.</b></label><br></br>
                            <label className="w3-text-indigo"><b>Elija la hora.</b></label>
                            <select className="w3-select w3-border w3-round-large">
                                <option defaultValue={0}>12 am</option>
                                <option value={1}>1 am</option>
                                <option value={2}>2 am</option>
                                <option value={3}>3 am</option>
                                <option value={4}>4 am</option>
                                <option value={5}>5 am</option>
                                <option value={6}>6 am</option>
                                <option value={7}>7 am</option>
                                <option value={8}>8 am</option>
                                <option value={9}>9 am</option>
                                <option value={10}>10 am</option>
                                <option value={11}>11 am</option>
                                <option value={12}>12 pm</option>
                                <option value={13}>1 pm</option>
                                <option value={14}>2 pm</option>
                                <option value={15}>3 pm</option>
                                <option value={16}>4 pm</option>
                                <option value={17}>5 pm</option>
                                <option value={18}>6 pm</option>
                                <option value={19}>7 pm</option>
                                <option value={20}>8 pm</option>
                                <option value={21}>9 pm</option>
                                <option value={22}>10 pm</option>
                                <option value={23}>11 pm</option>
                            </select>
                            <label className="w3-text-indigo"><b>Elija el minuto.</b></label>
                            <select className="w3-select w3-border w3-round-large">
                                <option defaultValue={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                                <option value={13}>13</option>
                                <option value={14}>14</option>
                                <option value={15}>15</option>
                                <option value={16}>16</option>
                                <option value={17}>17</option>
                                <option value={18}>18</option>
                                <option value={19}>19</option>
                                <option value={20}>20</option>
                                <option value={21}>21</option>
                                <option value={22}>22</option>
                                <option value={23}>23</option>
                                <option value={24}>24</option>
                                <option value={25}>25</option>
                                <option value={26}>26</option>
                                <option value={27}>27</option>
                                <option value={28}>28</option>
                                <option value={29}>29</option>
                                <option value={30}>30</option>
                                <option value={31}>31</option>
                                <option value={32}>32</option>
                                <option value={33}>33</option>
                                <option value={34}>34</option>
                                <option value={35}>35</option>
                                <option value={36}>36</option>
                                <option value={37}>37</option>
                                <option value={38}>38</option>
                                <option value={39}>39</option>
                                <option value={40}>40</option>
                                <option value={41}>41</option>
                                <option value={42}>42</option>
                                <option value={43}>43</option>
                                <option value={44}>44</option>
                                <option value={45}>45</option>
                                <option value={46}>46</option>
                                <option value={47}>47</option>
                                <option value={48}>48</option>
                                <option value={49}>49</option>
                                <option value={50}>50</option>
                                <option value={51}>51</option>
                                <option value={52}>52</option>
                                <option value={53}>53</option>
                                <option value={54}>54</option>
                                <option value={55}>55</option>
                                <option value={56}>56</option>
                                <option value={57}>57</option>
                                <option value={58}>58</option>
                                <option value={59}>59</option>
                            </select>
                            <label className="w3-text-indigo"><b>Franja de turno.</b></label><br></br>
                            <label className="w3-text-indigo"><b>Horas.</b></label>
                            <select className="w3-select w3-border w3-round-large">
                                <option defaultValue={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                            </select>
                            <label className="w3-text-indigo"><b>Minutos.</b></label>
                            <select className="w3-select w3-border w3-round-large">
                                <option defaultValue={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                                <option value={13}>13</option>
                                <option value={14}>14</option>
                                <option value={15}>15</option>
                                <option value={16}>16</option>
                                <option value={17}>17</option>
                                <option value={18}>18</option>
                                <option value={19}>19</option>
                                <option value={20}>20</option>
                                <option value={21}>21</option>
                                <option value={22}>22</option>
                                <option value={23}>23</option>
                                <option value={24}>24</option>
                                <option value={25}>25</option>
                                <option value={26}>26</option>
                                <option value={27}>27</option>
                                <option value={28}>28</option>
                                <option value={29}>29</option>
                                <option value={30}>30</option>
                                <option value={31}>31</option>
                                <option value={32}>32</option>
                                <option value={33}>33</option>
                                <option value={34}>34</option>
                                <option value={35}>35</option>
                                <option value={36}>36</option>
                                <option value={37}>37</option>
                                <option value={38}>38</option>
                                <option value={39}>39</option>
                                <option value={40}>40</option>
                                <option value={41}>41</option>
                                <option value={42}>42</option>
                                <option value={43}>43</option>
                                <option value={44}>44</option>
                                <option value={45}>45</option>
                                <option value={46}>46</option>
                                <option value={47}>47</option>
                                <option value={48}>48</option>
                                <option value={49}>49</option>
                                <option value={50}>50</option>
                                <option value={51}>51</option>
                                <option value={52}>52</option>
                                <option value={53}>53</option>
                                <option value={54}>54</option>
                                <option value={55}>55</option>
                                <option value={56}>56</option>
                                <option value={57}>57</option>
                                <option value={58}>58</option>
                                <option value={59}>59</option>
                            </select>              
                        </div>
                        <div className="w3-col m2 w3-center w3-panel">
                            <label className="w3-text-indigo"><b>Hora de Finalización.</b></label><br></br>
                            <label className="w3-text-indigo"><b>Elija la hora.</b></label>
                            <select className="w3-select w3-border w3-round-large">
                                <option defaultValue={0}>12 am</option>
                                <option value={1}>1 am</option>
                                <option value={2}>2 am</option>
                                <option value={3}>3 am</option>
                                <option value={4}>4 am</option>
                                <option value={5}>5 am</option>
                                <option value={6}>6 am</option>
                                <option value={7}>7 am</option>
                                <option value={8}>8 am</option>
                                <option value={9}>9 am</option>
                                <option value={10}>10 am</option>
                                <option value={11}>11 am</option>
                                <option value={12}>12 pm</option>
                                <option value={13}>1 pm</option>
                                <option value={14}>2 pm</option>
                                <option value={15}>3 pm</option>
                                <option value={16}>4 pm</option>
                                <option value={17}>5 pm</option>
                                <option value={18}>6 pm</option>
                                <option value={19}>7 pm</option>
                                <option value={20}>8 pm</option>
                                <option value={21}>9 pm</option>
                                <option value={22}>10 pm</option>
                                <option value={23}>11 pm</option>
                            </select>
                            <label className="w3-text-indigo"><b>Elija el minuto.</b></label>
                            <select className="w3-select w3-border w3-round-large">
                                <option defaultValue={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                                <option value={13}>13</option>
                                <option value={14}>14</option>
                                <option value={15}>15</option>
                                <option value={16}>16</option>
                                <option value={17}>17</option>
                                <option value={18}>18</option>
                                <option value={19}>19</option>
                                <option value={20}>20</option>
                                <option value={21}>21</option>
                                <option value={22}>22</option>
                                <option value={23}>23</option>
                                <option value={24}>24</option>
                                <option value={25}>25</option>
                                <option value={26}>26</option>
                                <option value={27}>27</option>
                                <option value={28}>28</option>
                                <option value={29}>29</option>
                                <option value={30}>30</option>
                                <option value={31}>31</option>
                                <option value={32}>32</option>
                                <option value={33}>33</option>
                                <option value={34}>34</option>
                                <option value={35}>35</option>
                                <option value={36}>36</option>
                                <option value={37}>37</option>
                                <option value={38}>38</option>
                                <option value={39}>39</option>
                                <option value={40}>40</option>
                                <option value={41}>41</option>
                                <option value={42}>42</option>
                                <option value={43}>43</option>
                                <option value={44}>44</option>
                                <option value={45}>45</option>
                                <option value={46}>46</option>
                                <option value={47}>47</option>
                                <option value={48}>48</option>
                                <option value={49}>49</option>
                                <option value={50}>50</option>
                                <option value={51}>51</option>
                                <option value={52}>52</option>
                                <option value={53}>53</option>
                                <option value={54}>54</option>
                                <option value={55}>55</option>
                                <option value={56}>56</option>
                                <option value={57}>57</option>
                                <option value={58}>58</option>
                                <option value={59}>59</option>
                            </select>
                            <label className="w3-text-indigo"><b>Descanso entre turnos.</b></label><br></br>
                            <label className="w3-text-indigo"><b>Horas.</b></label>
                            <select className="w3-select w3-border w3-round-large">
                                <option defaultValue={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                            </select>
                            <label className="w3-text-indigo"><b>Minutos.</b></label>
                            <select className="w3-select w3-border w3-round-large">
                                <option defaultValue={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                                <option value={13}>13</option>
                                <option value={14}>14</option>
                                <option value={15}>15</option>
                                <option value={16}>16</option>
                                <option value={17}>17</option>
                                <option value={18}>18</option>
                                <option value={19}>19</option>
                                <option value={20}>20</option>
                                <option value={21}>21</option>
                                <option value={22}>22</option>
                                <option value={23}>23</option>
                                <option value={24}>24</option>
                                <option value={25}>25</option>
                                <option value={26}>26</option>
                                <option value={27}>27</option>
                                <option value={28}>28</option>
                                <option value={29}>29</option>
                                <option value={30}>30</option>
                                <option value={31}>31</option>
                                <option value={32}>32</option>
                                <option value={33}>33</option>
                                <option value={34}>34</option>
                                <option value={35}>35</option>
                                <option value={36}>36</option>
                                <option value={37}>37</option>
                                <option value={38}>38</option>
                                <option value={39}>39</option>
                                <option value={40}>40</option>
                                <option value={41}>41</option>
                                <option value={42}>42</option>
                                <option value={43}>43</option>
                                <option value={44}>44</option>
                                <option value={45}>45</option>
                                <option value={46}>46</option>
                                <option value={47}>47</option>
                                <option value={48}>48</option>
                                <option value={49}>49</option>
                                <option value={50}>50</option>
                                <option value={51}>51</option>
                                <option value={52}>52</option>
                                <option value={53}>53</option>
                                <option value={54}>54</option>
                                <option value={55}>55</option>
                                <option value={56}>56</option>
                                <option value={57}>57</option>
                                <option value={58}>58</option>
                                <option value={59}>59</option>
                            </select> 
                            <Horas/>             
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
}
