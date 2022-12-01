<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Person extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'person';
    protected $primaryKey = 'person_ID';
    protected $fillable = array(
        'nationality_ID',
        'ubigeous_PlaceBirth',
        'ubigeous_Home',
        'statusmarital_ID',
        'typedocument_ID',
        'person_Name',
        'person_LastNamePaternal',
        'person_LastNameMaternal',
        'person_LastNameMaternal',
        'person_Gender',
        'person_RUC',
        'person_NumberDocumentID',
        'person_DateBirth',
        'person_Direction',
        'person_Phone',
        'person_CellPhone',
        'person_Email',
        'person_Home',
        'person_WebSite',
        'person_TypeAccountSoles',
        'person_TypeAccountDolares',
        'person_AccountNumber',
        'person_CreationDate',
        'person_CreationUser',
        'person_ModificationDate',
        'person_ModificationUser',
        'person_StatusID'
    );

    public $timestamps = false;
    public static $rules = array();

}
