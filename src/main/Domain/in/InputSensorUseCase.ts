/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

// import {ObstacleMessageObj} from "../../ObstacleMessageObj";
import {Position} from "../../Position";

export interface InputSensorUseCase {
    receivedObstacle(obs: Position[]): void;
}
